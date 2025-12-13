# 🔄 Update Academy Functions for New Schema

The existing Edge Functions were designed for a different database schema than what we created in `setup-academy-schema.sql`. This guide will help you update them to work with the new schema.

## 📋 Schema Differences

### Existing Functions Expect:
- `courses` table with `instructor`, `categories`, `lessons`, `enrollments` relationships
- `enrollments` table with specific fields
- Complex joins and relationships

### Our New Schema Has:
- Simplified `courses` table
- Separate `modules` and `lessons` tables
- Simplified `enrollments` table
- `quiz_questions`, `quiz_attempts`, `certificates` tables

## 🛠️ Required Updates

### 1. Update `get-courses.ts`

Replace the existing file with this simplified version:

```typescript
// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";

interface GetCoursesQuery {
  category?: string;
  level?: string;
  limit?: number;
  offset?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Serve the function
serve(async (req) => {
  try {
    // Parse query parameters
    const url = new URL(req.url);
    const limitParam = url.searchParams.get("limit");
    const offsetParam = url.searchParams.get("offset");
    
    let limit = limitParam ? parseInt(limitParam) : 10;
    let offset = offsetParam ? parseInt(offsetParam) : 0;
    
    // Validate limit
    if (isNaN(limit) || limit < 1 || limit > 100) {
      limit = 10;
    }
    
    // Validate offset
    if (isNaN(offset) || offset < 0) {
      offset = 0;
    }
    
    const queryParams: GetCoursesQuery = {
      category: url.searchParams.get("category") || undefined,
      level: url.searchParams.get("level") || undefined,
      limit: limit,
      offset: offset,
      search: url.searchParams.get("search") || undefined,
      sortBy: url.searchParams.get("sortBy") || "created_at",
      sortOrder: (url.searchParams.get("sortOrder") as "asc" | "desc") || "desc"
    };
    
    // Build query for our simplified schema
    let query = supabase
      .from("courses")
      .select("*")
      .eq("is_published", true);
    
    // Apply filters
    if (queryParams.category) {
      query = query.eq("category", queryParams.category);
    }
    
    if (queryParams.level) {
      query = query.eq("level", queryParams.level);
    }
    
    if (queryParams.search) {
      query = query.ilike("title", `%${queryParams.search}%`);
    }
    
    // Apply sorting
    query = query.order(queryParams.sortBy || "created_at", { 
      ascending: queryParams.sortOrder === "asc" 
    });
    
    // Apply pagination
    const { data, error, count } = await query
      .range(offset, offset + limit - 1);
    
    if (error) {
      throw new Error(error.message);
    }
    
    // Enhance courses with additional data
    const enhancedCourses = await Promise.all(data.map(async (course) => {
      // Get module count
      const { count: moduleCount, error: moduleError } = await supabase
        .from("modules")
        .select("count", { count: "exact", head: true })
        .eq("course_id", course.id);
      
      // Get enrollment count
      const { count: enrollmentCount, error: enrollmentError } = await supabase
        .from("enrollments")
        .select("count", { count: "exact", head: true })
        .eq("course_id", course.id);
      
      return {
        ...course,
        modules_count: moduleCount || 0,
        enrollments_count: enrollmentCount || 0
      };
    }));
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          courses: enhancedCourses,
          pagination: {
            limit: limit,
            offset: offset,
            total: count,
            hasMore: count ? (offset + limit) < count : false
          }
        }
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
    
  } catch (err) {
    console.error("Get Courses Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "Failed to fetch courses" 
      }), 
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
  }
});
```

### 2. Update `enroll.ts`

Replace the existing file with this version:

```typescript
// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";
import { requireAuth, getUserFromToken } from "../_utils/auth.ts";

interface EnrollPayload {
  courseId: string;
}

// Serve the function
serve(async (req) => {
  try {
    // Get user from auth token
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Parse request body
    const payload: EnrollPayload = await req.json();
    
    // Validate course ID
    if (!payload.courseId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Course ID is required" 
        }), 
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Check if course exists and is published
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id, is_published")
      .eq("id", payload.courseId)
      .eq("is_published", true)
      .single();
    
    if (courseError || !course) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Course not found or not available" 
        }), 
        { 
          status: 404, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Check if already enrolled
    const { data: existingEnrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", payload.courseId)
      .maybeSingle();
    
    if (existingEnrollment) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Already enrolled in this course" 
        }), 
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Create enrollment
    const { data: enrollment, error: createError } = await supabase
      .from("enrollments")
      .insert({
        user_id: user.id,
        course_id: payload.courseId,
        enrollment_date: new Date().toISOString(),
        progress: 0
      })
      .select()
      .single();
    
    if (createError) {
      throw new Error(createError.message);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Successfully enrolled in course",
        data: enrollment
      }),
      {
        status: 201,
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
    
  } catch (err) {
    if (err.message === "Missing or invalid Authorization header") {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Unauthorized" 
        }), 
        { 
          status: 401, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    console.error("Enroll Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "Failed to enroll in course" 
      }), 
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
  }
});
```

### 3. Update `get-enrollments.ts`

Replace the existing file with this version:

```typescript
// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";
import { requireAuth, getUserFromToken } from "../_utils/auth.ts";

// Serve the function
serve(async (req) => {
  try {
    // Get user from auth token
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Get user's enrollments with course details
    const { data: enrollments, error } = await supabase
      .from("enrollments")
      .select(`
        *,
        courses (
          id,
          title,
          description,
          thumbnail_url,
          category,
          level,
          duration
        )
      `)
      .eq("user_id", user.id)
      .order("enrollment_date", { ascending: false });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: enrollments
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
    
  } catch (err) {
    if (err.message === "Missing or invalid Authorization header") {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Unauthorized" 
        }), 
        { 
          status: 401, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    console.error("Get Enrollments Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "Failed to fetch enrollments" 
      }), 
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
  }
});
```

### 4. Update `get-course.ts`

Replace the existing file with this version:

```typescript
// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";

interface GetCourseParams {
  id: string;
}

// Serve the function
serve(async (req) => {
  try {
    // Parse course ID from URL
    const url = new URL(req.url);
    const courseId = url.searchParams.get("id");
    
    // Validate course ID
    if (!courseId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Course ID is required" 
        }), 
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Get course details
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .eq("is_published", true)
      .single();
    
    if (courseError || !course) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Course not found or not available" 
        }), 
        { 
          status: 404, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Get course modules with lessons
    const { data: modules, error: modulesError } = await supabase
      .from("modules")
      .select(`
        *,
        lessons (*)
      `)
      .eq("course_id", courseId)
      .eq("is_published", true)
      .order("order_index", { ascending: true });
    
    if (modulesError) {
      throw new Error(modulesError.message);
    }
    
    // Return course with modules and lessons
    const courseWithContent = {
      ...course,
      modules: modules || []
    };
    
    return new Response(
      JSON.stringify({
        success: true,
        data: courseWithContent
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
    
  } catch (err) {
    console.error("Get Course Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "Failed to fetch course" 
      }), 
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
  }
});
```

### 5. Update `update-progress.ts`

Replace the existing file with this version:

```typescript
// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";
import { requireAuth, getUserFromToken } from "../_utils/auth.ts";

interface UpdateProgressPayload {
  enrollmentId: string;
  lessonId: string;
  completed: boolean;
}

// Serve the function
serve(async (req) => {
  try {
    // Get user from auth token
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Parse request body
    const payload: UpdateProgressPayload = await req.json();
    
    // Validate required fields
    if (!payload.enrollmentId || !payload.lessonId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Enrollment ID and Lesson ID are required" 
        }), 
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Verify enrollment belongs to user
    const { data: enrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .select("id, user_id, course_id, completed_lessons")
      .eq("id", payload.enrollmentId)
      .eq("user_id", user.id)
      .single();
    
    if (enrollmentError || !enrollment) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Enrollment not found or unauthorized" 
        }), 
        { 
          status: 404, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Update completed lessons array
    let completedLessons = enrollment.completed_lessons || [];
    
    if (payload.completed) {
      // Add lesson to completed lessons if not already there
      if (!completedLessons.includes(payload.lessonId)) {
        completedLessons.push(payload.lessonId);
      }
    } else {
      // Remove lesson from completed lessons
      completedLessons = completedLessons.filter((id: string) => id !== payload.lessonId);
    }
    
    // Calculate progress percentage
    // First get total lessons in the course
    const { count: totalLessons, error: countError } = await supabase
      .from("lessons")
      .select("count", { count: "exact", head: true })
      .eq("module_id", enrollment.course_id);
    
    const progress = totalLessons ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
    
    // Check if course is completed
    const completedDate = progress === 100 ? new Date().toISOString() : null;
    
    // Update enrollment
    const { data: updatedEnrollment, error: updateError } = await supabase
      .from("enrollments")
      .update({
        completed_lessons: completedLessons,
        progress: progress,
        completed_date: completedDate,
        last_accessed: new Date().toISOString()
      })
      .eq("id", payload.enrollmentId)
      .select()
      .single();
    
    if (updateError) {
      throw new Error(updateError.message);
    }
    
    // If course completed, create certificate
    if (progress === 100 && !enrollment.completed_date) {
      const { error: certError } = await supabase
        .from("certificates")
        .insert({
          user_id: user.id,
          course_id: enrollment.course_id,
          enrollment_id: payload.enrollmentId,
          issued_at: new Date().toISOString()
        });
      
      if (certError) {
        console.error("Failed to create certificate:", certError);
        // Don't fail the whole operation if certificate creation fails
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Progress updated successfully",
        data: updatedEnrollment
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
    
  } catch (err) {
    if (err.message === "Missing or invalid Authorization header") {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Unauthorized" 
        }), 
        { 
          status: 401, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    console.error("Update Progress Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "Failed to update progress" 
      }), 
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
  }
});
```

## 🚀 Deployment After Updates

After updating the functions, deploy them to your Academy project:

```bash
# Deploy all updated functions
supabase functions deploy --project-ref YOUR_ACADEMY_PROJECT_ID
```

## ✅ Verification

After deployment, test the functions to ensure they work with your new schema:

1. Test `get-courses` function
2. Test `enroll` function with a real course
3. Test `get-enrollments` function
4. Test `get-course` function with a course ID
5. Test `update-progress` function

## 📝 Notes

- The updated functions are simpler and match your new schema
- They maintain the same API response structure for compatibility
- Authentication is preserved in functions that require it
- Progress tracking and certificate generation are included
- Module and lesson hierarchy is maintained
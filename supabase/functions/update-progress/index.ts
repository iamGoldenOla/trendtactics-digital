// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "./_utils/supabaseClient.ts";
import { requireAuth, getUserFromToken } from "./_utils/auth.ts";

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
      completedLessons = completedLessons.filter((id) => id !== payload.lessonId);
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
# Comprehensive PowerShell script for complete Academy setup
# Usage: .\full-academy-setup.ps1 -ProjectRef "your_academy_project_id"

param(
    [Parameter(Mandatory=$false)]
    [string]$ProjectRef = ""
)

Write-Host "🎓 Trendtactics Academy Complete Setup" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan

# Define paths
$projectRoot = "c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
$functionsDir = "$projectRoot\supabase\functions\courses"

# Function to check if running on Windows
function Test-WindowsPlatform {
    return (!$PSVersionTable.Platform -or $PSVersionTable.Platform -eq "Win32NT")
}

# Function to check if npm is installed
function Test-NpmInstalled {
    try {
        $npmVersion = npm --version
        Write-Host "✅ npm found: v$npmVersion" -ForegroundColor Green
        return $true
    } catch {
        return $false
    }
}

# Function to install Supabase CLI
function Install-SupabaseCLI {
    Write-Host "`n📥 Installing Supabase CLI..." -ForegroundColor Cyan
    try {
        npm install -g supabase
        Write-Host "✅ Supabase CLI installed successfully!" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "❌ Failed to install Supabase CLI: $_" -ForegroundColor Red
        return $false
    }
}

# Function to check Supabase CLI installation
function Test-SupabaseCLI {
    try {
        $supabaseVersion = supabase --version
        Write-Host "✅ Supabase CLI version: $supabaseVersion" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "❌ Supabase CLI not found" -ForegroundColor Red
        return $false
    }
}

# Function to check login status
function Test-SupabaseLogin {
    Write-Host "`n🔍 Checking Supabase login status..." -ForegroundColor Cyan
    try {
        $loginStatus = supabase status 2>$null
        if ($loginStatus -match "Not logged in") {
            Write-Host "⚠️  Not logged in to Supabase" -ForegroundColor Yellow
            return $false
        } else {
            Write-Host "✅ Already logged in to Supabase" -ForegroundColor Green
            return $true
        }
    } catch {
        Write-Host "⚠️  Unable to check login status" -ForegroundColor Yellow
        return $false
    }
}

# Function to update Edge Functions for new schema
function Update-EdgeFunctions {
    Write-Host "`n🔄 Updating Edge Functions for new schema..." -ForegroundColor Cyan
    
    # Define the updated function content
    $getCoursesContent = @'
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
'@

    $enrollContent = @'
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
'@

    $getEnrollmentsContent = @'
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
'@

    $getCourseContent = @'
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
'@

    $updateProgressContent = @'
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
'@

    # Update functions
    try {
        # Update get-courses.ts
        Set-Content -Path "$functionsDir\get-courses.ts" -Value $getCoursesContent
        Write-Host "   ✅ Updated get-courses.ts" -ForegroundColor Green
        
        # Update enroll.ts
        Set-Content -Path "$functionsDir\enroll.ts" -Value $enrollContent
        Write-Host "   ✅ Updated enroll.ts" -ForegroundColor Green
        
        # Update get-enrollments.ts
        Set-Content -Path "$functionsDir\get-enrollments.ts" -Value $getEnrollmentsContent
        Write-Host "   ✅ Updated get-enrollments.ts" -ForegroundColor Green
        
        # Update get-course.ts
        Set-Content -Path "$functionsDir\get-course.ts" -Value $getCourseContent
        Write-Host "   ✅ Updated get-course.ts" -ForegroundColor Green
        
        # Update update-progress.ts
        Set-Content -Path "$functionsDir\update-progress.ts" -Value $updateProgressContent
        Write-Host "   ✅ Updated update-progress.ts" -ForegroundColor Green
        
        Write-Host "✅ All functions updated successfully!" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "❌ Failed to update functions: $_" -ForegroundColor Red
        return $false
    }
}

# Function to deploy functions
function Deploy-Functions {
    param([string]$ProjectRef)
    
    Write-Host "`n🚀 Deploying Academy Edge Functions..." -ForegroundColor Cyan
    Write-Host "   Target Project: $ProjectRef" -ForegroundColor Blue
    
    # List functions to be deployed
    Write-Host "`n📋 Functions to be deployed:" -ForegroundColor Cyan
    if (Test-Path $functionsDir) {
        Get-ChildItem -Directory $functionsDir | Where-Object { $_.Name -ne "_utils" } | ForEach-Object {
            Write-Host "   • $($_.Name)" -ForegroundColor White
        }
    }
    
    # Deploy functions
    try {
        Set-Location $projectRoot
        Write-Host "`n   Deploying all functions..." -ForegroundColor White
        $result = supabase functions deploy --project-ref $ProjectRef 2>&1
        Write-Host $result -ForegroundColor Gray
        
        Write-Host "`n✅ Deployment completed!" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "❌ Deployment failed: $_" -ForegroundColor Red
        return $false
    }
}

# Function to verify deployment
function Verify-Deployment {
    param([string]$ProjectRef)
    
    Write-Host "`n🔍 Verifying deployment..." -ForegroundColor Cyan
    try {
        $listResult = supabase functions list --project-ref $ProjectRef 2>&1
        Write-Host $listResult -ForegroundColor Gray
        Write-Host "`n✅ Functions verified!" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "⚠️  Unable to verify functions: $_" -ForegroundColor Yellow
        return $false
    }
}

# Main execution
Write-Host "🔧 Starting Academy Setup Process..." -ForegroundColor Cyan

# Check platform
if (!(Test-WindowsPlatform)) {
    Write-Host "❌ This script is designed for Windows PowerShell" -ForegroundColor Red
    exit 1
}

# Check npm
if (!(Test-NpmInstalled)) {
    Write-Host "❌ npm not found. Please install Node.js first:" -ForegroundColor Red
    Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check/install Supabase CLI
if (!(Test-SupabaseCLI)) {
    if (!(Install-SupabaseCLI)) {
        Write-Host "❌ Failed to install Supabase CLI" -ForegroundColor Red
        exit 1
    }
}

# Check login
if (!(Test-SupabaseLogin)) {
    Write-Host "`n🔐 Please log in to Supabase:" -ForegroundColor Yellow
    Write-Host "   Run: supabase login" -ForegroundColor White
    Write-Host "   This will open a browser for authentication" -ForegroundColor White
    Write-Host "   After logging in, run this script again" -ForegroundColor White
    exit 1
}

# If no project ref provided, prompt for it
if ([string]::IsNullOrEmpty($ProjectRef)) {
    Write-Host "`n📝 Please provide your Academy Project Reference ID" -ForegroundColor Yellow
    Write-Host "   You can find this in your Supabase Dashboard:" -ForegroundColor White
    Write-Host "   1. Go to your Academy project" -ForegroundColor White
    Write-Host "   2. Settings → General" -ForegroundColor White
    Write-Host "   3. Project ID is listed there" -ForegroundColor White
    $ProjectRef = Read-Host "Enter Project Reference ID"
    
    if ([string]::IsNullOrEmpty($ProjectRef)) {
        Write-Host "❌ Project Reference ID is required" -ForegroundColor Red
        exit 1
    }
}

# Confirm project ref
Write-Host "`n🎯 Target Project: $ProjectRef" -ForegroundColor Blue
$confirmation = Read-Host "Is this correct? (y/N)"
if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "❌ Setup cancelled." -ForegroundColor Red
    exit 0
}

# Update functions
if (!(Update-EdgeFunctions)) {
    Write-Host "❌ Failed to update Edge Functions" -ForegroundColor Red
    exit 1
}

# Deploy functions
if (!(Deploy-Functions -ProjectRef $ProjectRef)) {
    Write-Host "❌ Failed to deploy functions" -ForegroundColor Red
    exit 1
}

# Verify deployment
Verify-Deployment -ProjectRef $ProjectRef

Write-Host "`n🎉 Academy Setup Complete!" -ForegroundColor Green
Write-Host "   ✅ Supabase CLI installed and configured" -ForegroundColor Green
Write-Host "   ✅ Edge Functions updated for new schema" -ForegroundColor Green
Write-Host "   ✅ Functions deployed to Academy project" -ForegroundColor Green
Write-Host "`n📋 Next steps:" -ForegroundColor White
Write-Host "   1. Test your functions in the Supabase Dashboard" -ForegroundColor White
Write-Host "   2. Verify Academy page functionality" -ForegroundColor White
Write-Host "   3. Test enrollment process" -ForegroundColor White
}

# Main execution
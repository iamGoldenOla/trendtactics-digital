// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "./_utils/supabaseClient.ts";

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
-- =====================================================
-- 🎓 Trendtactics Academy Database Schema
-- =====================================================
-- This schema is for the separate Academy Supabase project
-- It is completely isolated from the main website/Trendy AI backend

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CORE ACADEMY TABLES
-- =====================================================

-- Courses table
CREATE TABLE courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  short_description TEXT,
  category VARCHAR(100),
  level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  price DECIMAL(10, 2) DEFAULT 0,
  duration INTEGER, -- in hours
  thumbnail_url TEXT,
  video_url TEXT,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  prerequisites TEXT[],
  outcomes TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Modules table (for course structure)
CREATE TABLE modules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons table (within modules)
CREATE TABLE lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT, -- For text lessons
  video_url TEXT, -- For video lessons
  duration INTEGER, -- in minutes
  lesson_type VARCHAR(20) CHECK (lesson_type IN ('video', 'text', 'quiz', 'assignment')),
  order_index INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enrollments table
CREATE TABLE enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed_lessons UUID[], -- Array of completed lesson IDs
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_date TIMESTAMP WITH TIME ZONE,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  certificate_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Quiz questions table
CREATE TABLE quiz_questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  question_type VARCHAR(20) CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer')),
  options JSONB, -- For multiple choice: [{text: "Option 1", is_correct: true}, ...]
  correct_answer TEXT,
  explanation TEXT,
  points INTEGER DEFAULT 1,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz attempts table
CREATE TABLE quiz_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  answers JSONB, -- {question_id: "selected_answer"}
  score INTEGER,
  max_score INTEGER,
  passed BOOLEAN,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates table
CREATE TABLE certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  certificate_url TEXT,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expiry_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_is_published ON courses(is_published);
CREATE INDEX idx_courses_created_at ON courses(created_at DESC);
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_progress ON enrollments(progress);
CREATE INDEX idx_modules_course_id ON modules(course_id);
CREATE INDEX idx_modules_order ON modules(order_index);
CREATE INDEX idx_lessons_module_id ON lessons(module_id);
CREATE INDEX idx_lessons_order ON lessons(order_index);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Everyone can view published courses" ON courses
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can view all courses" ON courses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Instructors can manage their courses" ON courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() AND raw_user_meta_data->>'role' IN ('admin', 'instructor')
    )
  );

-- Modules policies
CREATE POLICY "Everyone can view published modules" ON modules
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = modules.course_id AND courses.is_published = true
    )
  );

-- Lessons policies
CREATE POLICY "Students can view lessons in enrolled courses" ON lessons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM modules 
      JOIN courses ON courses.id = modules.course_id
      JOIN enrollments ON enrollments.course_id = courses.id
      WHERE modules.id = lessons.module_id 
      AND enrollments.user_id = auth.uid()
    )
  );

-- Enrollments policies
CREATE POLICY "Users can view their own enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own enrollments" ON enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Quiz questions policies
CREATE POLICY "Students can view questions in enrolled course lessons" ON quiz_questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM lessons
      JOIN modules ON modules.id = lessons.module_id
      JOIN courses ON courses.id = modules.course_id
      JOIN enrollments ON enrollments.course_id = courses.id
      WHERE lessons.id = quiz_questions.lesson_id
      AND enrollments.user_id = auth.uid()
    )
  );

-- Certificates policies
CREATE POLICY "Users can view their own certificates" ON certificates
  FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- TRIGGERS FOR AUTOMATED UPDATES
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for all tables
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_questions_updated_at BEFORE UPDATE ON quiz_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA (Optional - uncomment to use)
-- =====================================================

/*
-- Insert sample course
INSERT INTO courses (
  title, 
  slug, 
  description, 
  short_description, 
  category, 
  level, 
  price, 
  duration, 
  is_published, 
  is_featured
) VALUES (
  'Complete Digital Marketing Mastery',
  'complete-digital-marketing-mastery',
  'Master SEO, social media, content marketing, email campaigns, and analytics. Learn proven strategies to grow your business online.',
  'Learn digital marketing from scratch to expert level',
  'Digital Marketing',
  'beginner',
  99.99,
  40,
  true,
  true
);

-- Insert sample module
INSERT INTO modules (course_id, title, description, order_index, is_published)
SELECT id, 'Introduction to Digital Marketing', 'Getting started with digital marketing basics', 1, true
FROM courses WHERE slug = 'complete-digital-marketing-mastery';

-- Insert sample lesson
INSERT INTO lessons (module_id, title, description, content, lesson_type, order_index, is_published)
SELECT m.id, 'What is Digital Marketing?', 'Introduction to the world of digital marketing', 
'<h2>Welcome to Digital Marketing</h2><p>Digital marketing is the promotion of brands to connect with potential customers using the internet and other forms of digital communication.</p>',
'text', 1, true
FROM modules m 
JOIN courses c ON c.id = m.course_id
WHERE c.slug = 'complete-digital-marketing-mastery' AND m.title = 'Introduction to Digital Marketing';
*/

-- =====================================================
-- STORAGE BUCKETS (if needed)
-- =====================================================

-- You may want to create storage buckets for:
-- - Course thumbnails
-- - Lesson videos
-- - Certificate files
-- - User avatars

-- Example:
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('course-thumbnails', 'course-thumbnails', true);
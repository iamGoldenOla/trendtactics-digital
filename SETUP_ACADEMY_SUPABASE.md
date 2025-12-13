# 🎓 Setting Up Academy Supabase Project

Follow these steps to create and configure your separate Supabase project for the Academy.

## 🚀 Step 1: Create New Supabase Project

1. Go to [https://app.supabase.com/](https://app.supabase.com/)
2. Click "New Project"
3. Fill in the details:
   - **Name**: `Trendtactics Academy`
   - **Database Password**: Set a strong password
   - **Region**: Choose the region closest to your users
4. Click "Create Project"

## 🔑 Step 2: Get Your Credentials

Once your project is created:

1. In the left sidebar, click "Settings" (gear icon)
2. Click "API"
3. Copy these values:
   - **Project URL**: Something like `https://abcdefghijklmnopqrst.supabase.co`
   - **anon key**: Long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## ⚙️ Step 3: Update Configuration

Open `js/academy-supabase.js` and replace the placeholder values:

```javascript
// BEFORE (placeholders):
const ACADEMY_SUPABASE_URL = 'https://YOUR_ACADEMY_PROJECT_URL.supabase.co';
const ACADEMY_SUPABASE_KEY = 'YOUR_ACADEMY_ANON_KEY_HERE';

// AFTER (your real credentials):
const ACADEMY_SUPABASE_URL = 'https://abcdefghijklmnopqrst.supabase.co';
const ACADEMY_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

## 🗄️ Step 4: Set Up Database Tables

Run these SQL commands in your Academy project's SQL editor:

```sql
-- Create courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  price DECIMAL(10, 2) DEFAULT 0,
  duration INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create enrollments table
CREATE TABLE enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  course_id UUID REFERENCES courses(id),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  enrollment_date TIMESTAMP DEFAULT NOW(),
  completed_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Courses are viewable by everyone" ON courses
  FOR SELECT USING (is_published = true);

CREATE POLICY "Users can view their own enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments" ON enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## 🚀 Step 5: Deploy Edge Functions

Navigate to your project directory and deploy the Academy functions:

```bash
# Go to your project directory
cd supabase/functions

# Deploy functions to your Academy project
supabase functions deploy get-courses --project-ref YOUR_ACADEMY_PROJECT_REF
supabase functions deploy enroll --project-ref YOUR_ACADEMY_PROJECT_REF
supabase functions deploy get-enrollments --project-ref YOUR_ACADEMY_PROJECT_REF
```

## ✅ Step 6: Verify Setup

1. Refresh the `test-backend-separation.html` page
2. Click "Test Connections"
3. You should see:
   - ✅ Main website client module loaded
   - ✅ Academy client initialized and ready

## 🧪 Step 7: Test With Sample Data

Add a sample course to test the connection:

```sql
-- Insert a sample course
INSERT INTO courses (title, description, category, level, price, duration, is_published)
VALUES (
  'Introduction to Digital Marketing',
  'Learn the fundamentals of digital marketing including SEO, social media, and email campaigns.',
  'Digital Marketing',
  'beginner',
  0,
  10,
  true
);
```

Then visit your Academy page to see the course displayed.

## 🎯 You're Done!

Your Academy now has its own separate Supabase backend while maintaining integration with the main website through the unified authentication system.
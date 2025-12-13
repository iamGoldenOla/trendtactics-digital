-- =====================================================
-- 📚 Course Structure for Trendtactics Academy
-- =====================================================
-- This script adds modules and lessons to your courses

-- First, let's add modules to the Web Development Masterclass
-- Module 1: HTML Fundamentals
INSERT INTO modules (course_id, title, description, order_index, is_published)
SELECT id, 'HTML Fundamentals', 'Learn the foundation of web development with HTML', 1, true
FROM courses WHERE slug = 'web-development-masterclass';

-- Module 2: CSS Styling
INSERT INTO modules (course_id, title, description, order_index, is_published)
SELECT id, 'CSS Styling', 'Make your websites beautiful with CSS', 2, true
FROM courses WHERE slug = 'web-development-masterclass';

-- Module 3: JavaScript Essentials
INSERT INTO modules (course_id, title, description, order_index, is_published)
SELECT id, 'JavaScript Essentials', 'Add interactivity to your websites', 3, true
FROM courses WHERE slug = 'web-development-masterclass';

-- Module 4: React Fundamentals
INSERT INTO modules (course_id, title, description, order_index, is_published)
SELECT id, 'React Fundamentals', 'Build dynamic user interfaces with React', 4, true
FROM courses WHERE slug = 'web-development-masterclass';

-- Module 5: Node.js Backend
INSERT INTO modules (course_id, title, description, order_index, is_published)
SELECT id, 'Node.js Backend', 'Create server-side applications with Node.js', 5, true
FROM courses WHERE slug = 'web-development-masterclass';

-- Now add modules to the Digital Marketing Complete Course
-- Module 1: SEO Fundamentals
INSERT INTO modules (course_id, title, description, order_index, is_published)
SELECT id, 'SEO Fundamentals', 'Learn the basics of Search Engine Optimization', 1, true
FROM courses WHERE slug = 'digital-marketing-complete-course';

-- Module 2: Content Marketing
INSERT INTO modules (course_id, title, description, order_index, is_published)
SELECT id, 'Content Marketing', 'Creating valuable content that attracts audiences', 2, true
FROM courses WHERE slug = 'digital-marketing-complete-course';

-- Module 3: Email Marketing
INSERT INTO modules (course_id, title, description, order_index, is_published)
SELECT id, 'Email Marketing', 'Design and implement email campaigns', 3, true
FROM courses WHERE slug = 'digital-marketing-complete-course';

-- Module 4: Social Media Marketing
INSERT INTO modules (course_id, title, description, order_index, is_published)
SELECT id, 'Social Media Marketing', 'Build presence on social platforms', 4, true
FROM courses WHERE slug = 'digital-marketing-complete-course';

-- Module 5: Facebook Ads
INSERT INTO modules (course_id, title, description, order_index, is_published)
SELECT id, 'Facebook Ads', 'Create profitable Facebook advertising campaigns', 5, true
FROM courses WHERE slug = 'digital-marketing-complete-course';

-- =====================================================
-- 📝 Adding Lessons
-- =====================================================
-- Note: You'll need to get the actual module IDs from your database
-- after inserting the modules above.

-- Example lessons for HTML Fundamentals (Module 1)
-- You'll need to replace MODULE_ID_HERE with the actual module ID

-- INSERT INTO lessons (module_id, title, description, content, lesson_type, duration, order_index, is_published)
-- VALUES (
--   MODULE_ID_HERE,
--   'Introduction to HTML',
--   'Understanding the structure of web pages',
--   '<h2>What is HTML?</h2><p>HTML stands for HyperText Markup Language...</p>',
--   'text',
--   15,
--   1,
--   true
-- );

-- INSERT INTO lessons (module_id, title, description, content, lesson_type, duration, order_index, is_published)
-- VALUES (
--   MODULE_ID_HERE,
--   'HTML Elements and Tags',
--   'Working with common HTML elements',
--   '<h2>HTML Tags</h2><p>Tags are the building blocks of HTML...</p>',
--   'text',
--   20,
--   2,
--   true
-- );

-- INSERT INTO lessons (module_id, title, description, content, lesson_type, duration, order_index, is_published)
-- VALUES (
--   MODULE_ID_HERE,
--   'Creating Lists and Tables',
--   'Organizing content with lists and tables',
--   '<h2>Lists in HTML</h2><p>There are three types of lists in HTML...</p>',
--   'text',
--   25,
--   3,
--   true
-- );

-- INSERT INTO lessons (module_id, title, description, content, lesson_type, duration, order_index, is_published)
-- VALUES (
--   MODULE_ID_HERE,
--   'HTML Forms',
--   'Collecting user input with forms',
--   '<h2>HTML Forms</h2><p>Forms are used to collect user input...</p>',
--   'text',
--   30,
--   4,
--   true
-- );

-- =====================================================
-- 📋 Instructions for Use
-- =====================================================
-- 1. Run the module insertion queries first
-- 2. Get the module IDs from the modules table
-- 3. Replace MODULE_ID_HERE with actual IDs in lesson queries
-- 4. Run the lesson insertion queries
-- 5. Verify structure in the Table Editor
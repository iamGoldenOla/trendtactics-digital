-- =====================================================
-- 📚 Sample Courses for Trendtactics Academy
-- =====================================================
-- This script inserts sample courses into your Academy database

-- Web Development Courses
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
  is_featured,
  prerequisites,
  outcomes
) VALUES (
  'Complete Web Development Masterclass',
  'web-development-masterclass',
  'Learn modern web development from scratch. Master HTML, CSS, JavaScript, React, Node.js, and build real-world projects.',
  'Build modern websites and web applications from scratch',
  'Web Development',
  'beginner',
  99.99,
  40,
  true,
  true,
  ARRAY['Basic computer skills'],
  ARRAY[
    'Build responsive websites with HTML & CSS',
    'Create dynamic web applications with JavaScript',
    'Develop full-stack applications with Node.js and React',
    'Deploy websites to production servers',
    'Work with databases and APIs'
  ]
);

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
  is_featured,
  prerequisites,
  outcomes
) VALUES (
  'Mobile App Development with React Native',
  'mobile-app-development-react-native',
  'Create cross-platform mobile applications for iOS and Android using React Native. Learn to build apps that look and feel native.',
  'Build iOS and Android apps with one codebase',
  'App Development',
  'intermediate',
  129.99,
  35,
  true,
  true,
  ARRAY['JavaScript fundamentals', 'Basic programming knowledge'],
  ARRAY[
    'Build cross-platform mobile apps with React Native',
    'Implement navigation and state management',
    'Integrate device features like camera and GPS',
    'Publish apps to App Store and Google Play',
    'Work with third-party libraries and APIs'
  ]
);

-- Digital Marketing Courses
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
  is_featured,
  prerequisites,
  outcomes
) VALUES (
  'Digital Marketing Complete Course',
  'digital-marketing-complete-course',
  'Master all aspects of digital marketing including SEO, content creation, email marketing, social media, and Facebook ads. Become a digital marketing expert.',
  'Master SEO, content marketing, email campaigns, and social media advertising',
  'Digital Marketing',
  'beginner',
  149.99,
  50,
  true,
  true,
  ARRAY['Basic computer skills', 'Internet browsing'],
  ARRAY[
    'Create and execute comprehensive digital marketing strategies',
    'Optimize websites for search engines (SEO)',
    'Create engaging content for blogs and social media',
    'Design and implement email marketing campaigns',
    'Run effective Facebook and social media advertising',
    'Analyze marketing metrics and ROI'
  ]
);

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
  is_featured,
  prerequisites,
  outcomes
) VALUES (
  'Content Creation Mastery',
  'content-creation-mastery',
  'Learn to create compelling content for blogs, social media, videos, and podcasts. Develop your unique voice and build a content strategy that drives engagement.',
  'Create engaging content that builds audiences and drives sales',
  'Digital Marketing',
  'beginner',
  79.99,
  25,
  true,
  false,
  ARRAY['Basic writing skills'],
  ARRAY[
    'Develop a unique content voice and style',
    'Create content for multiple platforms (blog, social media, video)',
    'Plan and execute content calendars',
    'Measure content performance and engagement',
    'Build content strategies that convert'
  ]
);

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
  is_featured,
  prerequisites,
  outcomes
) VALUES (
  'Advanced SEO Strategies',
  'advanced-seo-strategies',
  'Take your SEO skills to the next level with advanced techniques, technical SEO, and cutting-edge strategies to rank higher in search engines.',
  'Master advanced SEO techniques to rank higher in Google',
  'Digital Marketing',
  'advanced',
  99.99,
  20,
  true,
  false,
  ARRAY['Basic SEO knowledge'],
  ARRAY[
    'Implement advanced technical SEO optimizations',
    'Conduct comprehensive keyword research and analysis',
    'Build high-quality backlink profiles',
    'Optimize for local and voice search',
    'Track and measure SEO performance with analytics'
  ]
);

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
  is_featured,
  prerequisites,
  outcomes
) VALUES (
  'Email Marketing Automation',
  'email-marketing-automation',
  'Learn to design, implement, and optimize email marketing campaigns that convert. Master automation workflows and segmentation strategies.',
  'Create email campaigns that drive sales and engagement',
  'Digital Marketing',
  'intermediate',
  89.99,
  15,
  true,
  false,
  ARRAY['Basic marketing knowledge'],
  ARRAY[
    'Design professional email templates',
    'Create segmented email lists',
    'Implement automation workflows',
    'Measure email campaign performance',
    'Comply with email marketing regulations'
  ]
);

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
  is_featured,
  prerequisites,
  outcomes
) VALUES (
  'Social Media Marketing Strategy',
  'social-media-marketing-strategy',
  'Develop effective social media strategies for Facebook, Instagram, Twitter, LinkedIn, and TikTok. Learn to build communities and drive engagement.',
  'Build social media presence that drives business results',
  'Digital Marketing',
  'beginner',
  79.99,
  20,
  true,
  false,
  ARRAY['Social media familiarity'],
  ARRAY[
    'Create comprehensive social media strategies',
    'Design engaging content for different platforms',
    'Build and engage online communities',
    'Run social media advertising campaigns',
    'Measure social media ROI and analytics'
  ]
);

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
  is_featured,
  prerequisites,
  outcomes
) VALUES (
  'Facebook Ads Mastery',
  'facebook-ads-mastery',
  'Master Facebook advertising with advanced targeting, creative strategies, and optimization techniques. Learn to run profitable ad campaigns.',
  'Create Facebook ads that convert and drive sales',
  'Digital Marketing',
  'intermediate',
  99.99,
  18,
  true,
  false,
  ARRAY['Basic marketing knowledge', 'Facebook account'],
  ARRAY[
    'Create highly targeted Facebook ad campaigns',
    'Design compelling ad creatives',
    'Optimize ad performance and reduce costs',
    'Implement conversion tracking and pixel setup',
    'Scale successful campaigns for maximum ROI'
  ]
);

-- =====================================================
-- 📝 Instructions for Use
-- =====================================================
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to SQL Editor
-- 3. Copy and paste this entire script
-- 4. Click "Run" to insert all courses
-- 5. Verify courses appear in the Table Editor
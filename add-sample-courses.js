// Script to add sample courses to the Academy database
console.log('📚 Adding sample courses to Academy database...');

// Course data based on your requirements
const courses = [
  {
    title: "Complete Web Development Masterclass",
    slug: "web-development-masterclass",
    description: "Learn modern web development from scratch. Master HTML, CSS, JavaScript, React, Node.js, and build real-world projects.",
    short_description: "Build modern websites and web applications from scratch",
    category: "Web Development",
    level: "beginner",
    price: 99.99,
    duration: 40, // hours
    is_published: true,
    is_featured: true,
    prerequisites: ["Basic computer skills"],
    outcomes: [
      "Build responsive websites with HTML & CSS",
      "Create dynamic web applications with JavaScript",
      "Develop full-stack applications with Node.js and React",
      "Deploy websites to production servers",
      "Work with databases and APIs"
    ]
  },
  {
    title: "Mobile App Development with React Native",
    slug: "mobile-app-development-react-native",
    description: "Create cross-platform mobile applications for iOS and Android using React Native. Learn to build apps that look and feel native.",
    short_description: "Build iOS and Android apps with one codebase",
    category: "App Development",
    level: "intermediate",
    price: 129.99,
    duration: 35, // hours
    is_published: true,
    is_featured: true,
    prerequisites: ["JavaScript fundamentals", "Basic programming knowledge"],
    outcomes: [
      "Build cross-platform mobile apps with React Native",
      "Implement navigation and state management",
      "Integrate device features like camera and GPS",
      "Publish apps to App Store and Google Play",
      "Work with third-party libraries and APIs"
    ]
  },
  {
    title: "Digital Marketing Complete Course",
    slug: "digital-marketing-complete-course",
    description: "Master all aspects of digital marketing including SEO, content creation, email marketing, social media, and Facebook ads. Become a digital marketing expert.",
    short_description: "Master SEO, content marketing, email campaigns, and social media advertising",
    category: "Digital Marketing",
    level: "beginner",
    price: 149.99,
    duration: 50, // hours
    is_published: true,
    is_featured: true,
    prerequisites: ["Basic computer skills", "Internet browsing"],
    outcomes: [
      "Create and execute comprehensive digital marketing strategies",
      "Optimize websites for search engines (SEO)",
      "Create engaging content for blogs and social media",
      "Design and implement email marketing campaigns",
      "Run effective Facebook and social media advertising",
      "Analyze marketing metrics and ROI"
    ]
  },
  {
    title: "Content Creation Mastery",
    slug: "content-creation-mastery",
    description: "Learn to create compelling content for blogs, social media, videos, and podcasts. Develop your unique voice and build a content strategy that drives engagement.",
    short_description: "Create engaging content that builds audiences and drives sales",
    category: "Digital Marketing",
    level: "beginner",
    price: 79.99,
    duration: 25, // hours
    is_published: true,
    is_featured: false,
    prerequisites: ["Basic writing skills"],
    outcomes: [
      "Develop a unique content voice and style",
      "Create content for multiple platforms (blog, social media, video)",
      "Plan and execute content calendars",
      "Measure content performance and engagement",
      "Build content strategies that convert"
    ]
  },
  {
    title: "Advanced SEO Strategies",
    slug: "advanced-seo-strategies",
    description: "Take your SEO skills to the next level with advanced techniques, technical SEO, and cutting-edge strategies to rank higher in search engines.",
    short_description: "Master advanced SEO techniques to rank higher in Google",
    category: "Digital Marketing",
    level: "advanced",
    price: 99.99,
    duration: 20, // hours
    is_published: true,
    is_featured: false,
    prerequisites: ["Basic SEO knowledge"],
    outcomes: [
      "Implement advanced technical SEO optimizations",
      "Conduct comprehensive keyword research and analysis",
      "Build high-quality backlink profiles",
      "Optimize for local and voice search",
      "Track and measure SEO performance with analytics"
    ]
  },
  {
    title: "Email Marketing Automation",
    slug: "email-marketing-automation",
    description: "Learn to design, implement, and optimize email marketing campaigns that convert. Master automation workflows and segmentation strategies.",
    short_description: "Create email campaigns that drive sales and engagement",
    category: "Digital Marketing",
    level: "intermediate",
    price: 89.99,
    duration: 15, // hours
    is_published: true,
    is_featured: false,
    prerequisites: ["Basic marketing knowledge"],
    outcomes: [
      "Design professional email templates",
      "Create segmented email lists",
      "Implement automation workflows",
      "Measure email campaign performance",
      "Comply with email marketing regulations"
    ]
  },
  {
    title: "Social Media Marketing Strategy",
    slug: "social-media-marketing-strategy",
    description: "Develop effective social media strategies for Facebook, Instagram, Twitter, LinkedIn, and TikTok. Learn to build communities and drive engagement.",
    short_description: "Build social media presence that drives business results",
    category: "Digital Marketing",
    level: "beginner",
    price: 79.99,
    duration: 20, // hours
    is_published: true,
    is_featured: false,
    prerequisites: ["Social media familiarity"],
    outcomes: [
      "Create comprehensive social media strategies",
      "Design engaging content for different platforms",
      "Build and engage online communities",
      "Run social media advertising campaigns",
      "Measure social media ROI and analytics"
    ]
  },
  {
    title: "Facebook Ads Mastery",
    slug: "facebook-ads-mastery",
    description: "Master Facebook advertising with advanced targeting, creative strategies, and optimization techniques. Learn to run profitable ad campaigns.",
    short_description: "Create Facebook ads that convert and drive sales",
    category: "Digital Marketing",
    level: "intermediate",
    price: 99.99,
    duration: 18, // hours
    is_published: true,
    is_featured: false,
    prerequisites: ["Basic marketing knowledge", "Facebook account"],
    outcomes: [
      "Create highly targeted Facebook ad campaigns",
      "Design compelling ad creatives",
      "Optimize ad performance and reduce costs",
      "Implement conversion tracking and pixel setup",
      "Scale successful campaigns for maximum ROI"
    ]
  }
];

console.log(`📋 Preparing to add ${courses.length} courses:`);
courses.forEach((course, index) => {
  console.log(`   ${index + 1}. ${course.title} (${course.category})`);
});

console.log('\n📝 To add these courses to your database:');
console.log('   1. Go to your Supabase Dashboard');
console.log('   2. Navigate to Table Editor');
console.log('   3. Select the "courses" table');
console.log('   4. Click "Insert" to add new rows');
console.log('   5. Add the courses manually or use the SQL editor');

console.log('\n🔍 Or use this SQL script in the SQL Editor:');
console.log('\n--- COPY BELOW THIS LINE ---\n');

courses.forEach((course, index) => {
  console.log(`INSERT INTO courses (
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
  '${course.title}',
  '${course.slug}',
  '${course.description}',
  '${course.short_description}',
  '${course.category}',
  '${course.level}',
  ${course.price},
  ${course.duration},
  ${course.is_published},
  ${course.is_featured},
  ARRAY[${course.prerequisites.map(p => `'${p}'`).join(', ')}],
  ARRAY[${course.outcomes.map(o => `'${o}'`).join(', ')}]
);`);
  console.log('');
});

console.log('--- COPY ABOVE THIS LINE ---\n');

console.log('✅ Sample courses ready for database insertion!');
console.log('\n💡 Pro Tips:');
console.log('   • Start with the featured courses (marked with ★)');
console.log('   • Add modules and lessons after inserting courses');
console.log('   • Test enrollment with a sample user account');
console.log('   • Verify course display on the Academy page');
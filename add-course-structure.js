// Script to add sample modules and lessons to courses
console.log('📚 Adding course structure (modules and lessons)...');

// Sample structure for the Web Development Masterclass
const courseStructures = [
  {
    courseSlug: 'web-development-masterclass',
    moduleName: 'HTML Fundamentals',
    moduleDescription: 'Learn the foundation of web development with HTML',
    lessons: [
      {
        title: 'Introduction to HTML',
        description: 'Understanding the structure of web pages',
        lesson_type: 'text',
        duration: 15
      },
      {
        title: 'HTML Elements and Tags',
        description: 'Working with common HTML elements',
        lesson_type: 'text',
        duration: 20
      },
      {
        title: 'Creating Lists and Tables',
        description: 'Organizing content with lists and tables',
        lesson_type: 'text',
        duration: 25
      },
      {
        title: 'HTML Forms',
        description: 'Collecting user input with forms',
        lesson_type: 'text',
        duration: 30
      }
    ]
  },
  {
    courseSlug: 'web-development-masterclass',
    moduleName: 'CSS Styling',
    moduleDescription: 'Make your websites beautiful with CSS',
    lessons: [
      {
        title: 'CSS Basics',
        description: 'Introduction to Cascading Style Sheets',
        lesson_type: 'text',
        duration: 20
      },
      {
        title: 'Selectors and Properties',
        description: 'Targeting elements and applying styles',
        lesson_type: 'text',
        duration: 25
      },
      {
        title: 'Layout with Flexbox',
        description: 'Creating flexible layouts',
        lesson_type: 'text',
        duration: 35
      },
      {
        title: 'Grid Layout',
        description: 'Building complex layouts with CSS Grid',
        lesson_type: 'text',
        duration: 30
      }
    ]
  },
  {
    courseSlug: 'web-development-masterclass',
    moduleName: 'JavaScript Essentials',
    moduleDescription: 'Add interactivity to your websites',
    lessons: [
      {
        title: 'JavaScript Introduction',
        description: 'Understanding JavaScript and the DOM',
        lesson_type: 'text',
        duration: 25
      },
      {
        title: 'Variables and Data Types',
        description: 'Working with different data types',
        lesson_type: 'text',
        duration: 30
      },
      {
        title: 'Functions and Scope',
        description: 'Creating reusable code blocks',
        lesson_type: 'text',
        duration: 35
      },
      {
        title: 'DOM Manipulation',
        description: 'Interacting with web page elements',
        lesson_type: 'text',
        duration: 40
      }
    ]
  },
  {
    courseSlug: 'digital-marketing-complete-course',
    moduleName: 'SEO Fundamentals',
    moduleDescription: 'Learn the basics of Search Engine Optimization',
    lessons: [
      {
        title: 'Introduction to SEO',
        description: 'Understanding how search engines work',
        lesson_type: 'text',
        duration: 20
      },
      {
        title: 'Keyword Research',
        description: 'Finding the right keywords for your content',
        lesson_type: 'text',
        duration: 30
      },
      {
        title: 'On-Page SEO',
        description: 'Optimizing individual web pages',
        lesson_type: 'text',
        duration: 35
      },
      {
        title: 'Technical SEO',
        description: 'Improving site speed and crawlability',
        lesson_type: 'text',
        duration: 40
      }
    ]
  },
  {
    courseSlug: 'digital-marketing-complete-course',
    moduleName: 'Content Marketing',
    moduleDescription: 'Creating valuable content that attracts audiences',
    lessons: [
      {
        title: 'Content Strategy',
        description: 'Planning your content marketing approach',
        lesson_type: 'text',
        duration: 25
      },
      {
        title: 'Blog Writing',
        description: 'Writing engaging blog posts',
        lesson_type: 'text',
        duration: 35
      },
      {
        title: 'Video Content',
        description: 'Creating compelling video content',
        lesson_type: 'text',
        duration: 30
      },
      {
        title: 'Content Distribution',
        description: 'Sharing your content effectively',
        lesson_type: 'text',
        duration: 25
      }
    ]
  }
];

console.log(`📋 Preparing to add structure for ${courseStructures.length} modules:`);
courseStructures.forEach((structure, index) => {
  console.log(`   ${index + 1}. ${structure.moduleName} (${structure.lessons.length} lessons)`);
});

console.log('\n📝 To add this structure to your database:');
console.log('   1. First, get the course IDs from the courses table');
console.log('   2. Insert modules with the correct course_id');
console.log('   3. Insert lessons with the correct module_id');

console.log('\n🔍 SQL Commands to add modules and lessons:');
console.log('\n--- COPY BELOW THIS LINE ---\n');

courseStructures.forEach((structure, index) => {
  console.log(`-- Module: ${structure.moduleName}`);
  console.log(`INSERT INTO modules (course_id, title, description, order_index, is_published)`);
  console.log(`SELECT id, '${structure.moduleName}', '${structure.moduleDescription}', ${index + 1}, true`);
  console.log(`FROM courses WHERE slug = '${structure.courseSlug}';`);
  console.log('');
});

console.log('-- After inserting modules, get their IDs and insert lessons');
console.log('-- This is an example for the first module:');
console.log('-- INSERT INTO lessons (module_id, title, description, lesson_type, duration, order_index, is_published)');
console.log('-- VALUES (MODULE_ID_HERE, \'Lesson Title\', \'Lesson Description\', \'text\', 30, 1, true);');

console.log('\n--- COPY ABOVE THIS LINE ---\n');

console.log('✅ Course structure template ready!');
console.log('\n💡 Pro Tips:');
console.log('   • Add modules first, then lessons');
console.log('   • Use sequential order_index values');
console.log('   • Publish modules and lessons when ready');
console.log('   • Test course navigation on the Academy page');
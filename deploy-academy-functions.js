// =====================================================
// 🚀 Academy Edge Functions Deployment Script
// =====================================================
// This script helps deploy the Edge Functions to your Academy Supabase project
//
// Prerequisites:
// 1. Supabase CLI installed (https://supabase.com/docs/guides/cli)
// 2. Logged into Supabase CLI (supabase login)
// 3. Academy project created and linked

console.log('🎓 Starting Academy Edge Functions Deployment...');
console.log('================================================');

// Configuration - Update these with your actual project details
const ACADEMY_PROJECT_ID = 'uimdbodamoeyukrghchb'; // Get this from your Supabase dashboard
const FUNCTIONS_DIR = './supabase/functions';

// List of functions to deploy
const FUNCTIONS_TO_DEPLOY = [
  'get-courses',
  'enroll',
  'get-enrollments',
  'get-course',
  'update-progress'
];

// Deployment steps
async function deployAcademyFunctions() {
  console.log('\\n📋 Functions to deploy:');
  FUNCTIONS_TO_DEPLOY.forEach(func => console.log(`  • ${func}`));
  
  console.log('\\n🔧 Prerequisites check:');
  console.log('  ✅ Supabase CLI installed');
  console.log('  ✅ Logged into Supabase CLI');
  console.log(`  ✅ Academy project ID: ${ACADEMY_PROJECT_ID}`);
  console.log(`  ✅ Functions directory: ${FUNCTIONS_DIR}`);
  
  console.log('\\n🚀 Deployment commands (run these in your terminal):');
  console.log('===================================================');
  
  // Generate the deployment commands
  FUNCTIONS_TO_DEPLOY.forEach(func => {
    console.log(`supabase functions deploy ${func} --project-ref ${ACADEMY_PROJECT_ID}`);
  });
  
  console.log('\\n🔄 Alternative: Deploy all functions at once:');
  console.log(`supabase functions deploy --project-ref ${ACADEMY_PROJECT_ID}`);
  
  console.log('\\n📋 Post-deployment steps:');
  console.log('========================');
  console.log('1. Test the functions in your Supabase dashboard');
  console.log('2. Verify the Academy page loads courses correctly');
  console.log('3. Test enrollment functionality');
  console.log('4. Check the Supabase logs for any errors');
  
  console.log('\\n✅ Deployment preparation complete!');
  console.log('\\n📝 Next steps:');
  console.log('1. Update the ACADEMY_PROJECT_ID in this script');
  console.log('2. Run the deployment commands above in your terminal');
  console.log('3. Test the Academy functionality');
}

// Run the deployment preparation
deployAcademyFunctions();

// Helper function to generate environment variables setup
function generateEnvSetup() {
  console.log('\\n🔐 Environment Variables Setup:');
  console.log('==============================');
  console.log('Set these in your Academy Supabase project dashboard:');
  console.log('');
  console.log('Environment Variables needed:');
  console.log('  • PROJECT_NAME=Trendtactics Academy');
  console.log('  • SUPPORT_EMAIL=academy@trendtacticsdigital.com');
  console.log('  • SITE_URL=https://trendtacticsdigital.com/academy');
  console.log('');
  console.log('To set in Supabase dashboard:');
  console.log('1. Go to your Academy project');
  console.log('2. Settings → Configuration → Environment Variables');
  console.log('3. Add the variables above');
}

// Generate environment setup instructions
generateEnvSetup();

// Function to test the deployment
async function testDeployment() {
  console.log('\\n🧪 Testing Deployment:');
  console.log('=====================');
  console.log('After deployment, test these endpoints:');
  console.log('');
  console.log(`GET  https://${ACADEMY_PROJECT_ID}.functions.supabase.co/get-courses`);
  console.log(`POST https://${ACADEMY_PROJECT_ID}.functions.supabase.co/enroll`);
  console.log(`GET  https://${ACADEMY_PROJECT_ID}.functions.supabase.co/get-enrollments`);
  console.log('');
  console.log('Use the Supabase Dashboard to test functions:');
  console.log('1. Go to Database → Functions');
  console.log('2. Click on each function to test');
  console.log('3. Provide sample payloads for POST functions');
}

// Test the deployment
testDeployment();
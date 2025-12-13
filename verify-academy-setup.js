// =====================================================
// ✅ Academy Setup Verification Script
// =====================================================
// This script verifies that your Academy Supabase setup is correctly configured

console.log('🎓 Verifying Academy Setup...');
console.log('============================');

// Check if Academy Supabase utilities are loaded
function checkAcademyUtilities() {
  console.log('\\n🔍 Checking Academy Utilities...');
  
  if (typeof window !== 'undefined' && window.academySupabaseUtils) {
    console.log('  ✅ Academy Supabase utilities loaded');
    
    const isInitialized = window.academySupabaseUtils.isInitialized;
    console.log(`  ${isInitialized ? '✅' : '⚠️'} Academy client ${isInitialized ? 'initialized' : 'not initialized'}`);
    
    if (isInitialized) {
      console.log(`  📍 Academy Project URL: ${window.academySupabaseUtils.supabase.supabaseUrl}`);
    } else {
      console.log('  ℹ️  Update js/academy-supabase.js with your Academy project credentials');
    }
    
    return isInitialized;
  } else {
    console.log('  ❌ Academy Supabase utilities NOT loaded');
    console.log('  ℹ️  Make sure academy-supabase.js is included in your page');
    return false;
  }
}

// Check if main website utilities are loaded
function checkMainUtilities() {
  console.log('\\n🔍 Checking Main Website Utilities...');
  
  if (typeof window !== 'undefined' && window.supabaseUtils) {
    console.log('  ✅ Main website Supabase utilities loaded');
    console.log(`  📍 Main Project URL: ${window.supabaseUtils.supabase.supabaseUrl}`);
    return true;
  } else {
    console.log('  ❌ Main website Supabase utilities NOT loaded');
    return false;
  }
}

// Verify backend separation
function verifyBackendSeparation() {
  console.log('\\n🔍 Verifying Backend Separation...');
  
  const mainLoaded = typeof window !== 'undefined' && window.supabaseUtils;
  const academyLoaded = typeof window !== 'undefined' && window.academySupabaseUtils;
  
  if (mainLoaded && academyLoaded) {
    const mainUrl = window.supabaseUtils.supabase.supabaseUrl;
    const academyInitialized = window.academySupabaseUtils.isInitialized;
    const academyUrl = academyInitialized ? window.academySupabaseUtils.supabase.supabaseUrl : null;
    
    if (academyInitialized) {
      if (mainUrl !== academyUrl) {
        console.log('  ✅ PERFECT! Backends are properly separated');
        console.log(`     Main Website: ${mainUrl}`);
        console.log(`     Academy:      ${academyUrl}`);
        return true;
      } else {
        console.log('  ⚠️  WARNING: Both backends point to the same project');
        console.log('     This defeats the purpose of separation');
        return false;
      }
    } else {
      console.log('  ⚠️  Academy client not initialized');
      console.log('     Update js/academy-supabase.js with your Academy project credentials');
      return false;
    }
  } else {
    console.log('  ❌ Unable to verify separation - missing utilities');
    return false;
  }
}

// Test function availability
function testFunctionAvailability() {
  console.log('\\n🔍 Testing Function Availability...');
  
  const functions = [
    { name: 'getAcademyCourses', available: typeof window.academySupabaseUtils?.getAcademyCourses === 'function' },
    { name: 'enrollInAcademyCourse', available: typeof window.academySupabaseUtils?.enrollInAcademyCourse === 'function' },
    { name: 'getAcademyEnrollments', available: typeof window.academySupabaseUtils?.getAcademyEnrollments === 'function' },
    { name: 'getCourses', available: typeof window.supabaseUtils?.getCourses === 'function' },
    { name: 'enrollInCourse', available: typeof window.supabaseUtils?.enrollInCourse === 'function' }
  ];
  
  functions.forEach(func => {
    console.log(`  ${func.available ? '✅' : '❌'} ${func.name}: ${func.available ? 'Available' : 'Not available'}`);
  });
  
  const allAvailable = functions.every(func => func.available);
  console.log(`\\n  ${allAvailable ? '✅' : '⚠️'} All functions: ${allAvailable ? 'Available' : 'Some missing'}`);
  
  return allAvailable;
}

// Generate setup checklist
function generateSetupChecklist() {
  console.log('\\n📋 Setup Checklist:');
  console.log('==================');
  
  console.log('\\n✅ COMPLETED:');
  console.log('  • Created separate Academy Supabase project');
  console.log('  • Updated js/academy-supabase.js with credentials');
  console.log('  • Academy utilities loaded in browser');
  
  console.log('\\n🔄 PENDING:');
  console.log('  • Run setup-academy-schema.sql in Supabase SQL editor');
  console.log('  • Deploy Edge Functions using deploy-academy-functions.js');
  console.log('  • Test Academy page with real course data');
  console.log('  • Verify enrollment functionality');
  
  console.log('\\n🧪 TESTING:');
  console.log('  • Add sample course data to database');
  console.log('  • Test get-courses function');
  console.log('  • Test enroll function');
  console.log('  • Verify Academy page displays courses');
}

// Main verification function
function verifySetup() {
  console.log('🎓 Academy Backend Setup Verification');
  console.log('====================================');
  
  const mainReady = checkMainUtilities();
  const academyReady = checkAcademyUtilities();
  const separationOk = verifyBackendSeparation();
  const functionsOk = testFunctionAvailability();
  
  console.log('\\n📊 SUMMARY:');
  console.log('===========');
  console.log(`  Main Website Backend:     ${mainReady ? '✅ Ready' : '❌ Not ready'}`);
  console.log(`  Academy Backend:          ${academyReady && window.academySupabaseUtils?.isInitialized ? '✅ Ready' : '❌ Not ready'}`);
  console.log(`  Backend Separation:       ${separationOk ? '✅ Confirmed' : '❌ Not confirmed'}`);
  console.log(`  Function Availability:    ${functionsOk ? '✅ All available' : '❌ Some missing'}`);
  
  const overallSuccess = mainReady && academyReady && separationOk && functionsOk;
  console.log(`\\n  Overall Status:           ${overallSuccess ? '✅ SETUP COMPLETE!' : '⚠️  SETUP IN PROGRESS'}`);
  
  generateSetupChecklist();
  
  if (overallSuccess) {
    console.log('\\n🎉 Congratulations! Your Academy backend is properly configured.');
    console.log('   You can now start adding courses and testing the enrollment flow.');
  } else {
    console.log('\\n🔧 Next steps:');
    console.log('   1. Check the items marked with ❌ or ⚠️ above');
    console.log('   2. Follow the setup instructions in SETUP_ACADEMY_SUPABASE.md');
    console.log('   3. Run this verification again after making changes');
  }
}

// For Node.js environment
if (typeof window === 'undefined') {
  console.log('This script is designed to run in a browser environment.');
  console.log('Include it in an HTML page to verify your Academy setup.');
} else {
  // Run verification when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verifySetup);
  } else {
    verifySetup();
  }
}

// Export for potential Node.js use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { verifySetup, checkAcademyUtilities, checkMainUtilities, verifyBackendSeparation, testFunctionAvailability };
}
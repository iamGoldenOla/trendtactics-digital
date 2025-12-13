// Verification Script for Backend Separation
// This script verifies that the website and Academy use separate Supabase projects

console.log('🔍 Verifying Backend Separation...');
console.log('=====================================');

// Check if main website Supabase client exists
if (typeof window.supabaseUtils !== 'undefined' && window.supabaseUtils.supabase) {
    console.log('✅ Main Website Supabase Client: Available');
    console.log('   URL:', window.supabaseUtils.supabase.supabaseUrl);
} else {
    console.log('❌ Main Website Supabase Client: Not Found');
}

// Check if Academy Supabase client exists
if (typeof window.academySupabaseUtils !== 'undefined' && window.academySupabaseUtils.supabase) {
    console.log('✅ Academy Supabase Client: Available');
    console.log('   URL:', window.academySupabaseUtils.supabase.supabaseUrl);
} else {
    console.log('❌ Academy Supabase Client: Not Found');
}

// Check if URLs are different (indicating separate projects)
if (window.supabaseUtils && window.academySupabaseUtils) {
    const mainUrl = window.supabaseUtils.supabase.supabaseUrl;
    const academyUrl = window.academySupabaseUtils.supabase.supabaseUrl;
    
    if (mainUrl !== academyUrl) {
        console.log('✅ Backend Separation: SUCCESS');
        console.log('   Main Website and Academy use different Supabase projects');
    } else {
        console.log('⚠️  Backend Separation: POTENTIAL ISSUE');
        console.log('   Both clients point to the same Supabase project');
        console.log('   Note: You need to update the Academy configuration with a different project URL');
    }
}

console.log('=====================================');
console.log('📋 Next Steps:');
console.log('1. Create a new Supabase project for the Academy');
console.log('2. Update js/academy-supabase.js with the Academy project URL and anon key');
console.log('3. Run this verification again to confirm separation');

// Function to test connection to both backends
async function testConnections() {
    console.log('\\n🔌 Testing Connections...');
    console.log('==========================');
    
    // Test main website connection
    try {
        console.log('Testing Main Website Connection...');
        // This would normally test the connection, but we'll just log for now
        console.log('   Status: Connection test ready (implement actual test)');
    } catch (error) {
        console.log('   Status: Connection test failed', error.message);
    }
    
    // Test Academy connection
    try {
        console.log('Testing Academy Connection...');
        // This would normally test the connection, but we'll just log for now
        console.log('   Status: Connection test ready (implement actual test)');
    } catch (error) {
        console.log('   Status: Connection test failed', error.message);
    }
}

// Run connection tests
testConnections();
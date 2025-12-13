// Simple script to verify that both Supabase clients are properly initialized
console.log('🔍 Verifying Supabase Clients...');

// Check main website client
if (typeof window.supabaseUtils !== 'undefined') {
    console.log('✅ Main website Supabase client loaded');
    console.log('   URL:', window.supabaseUtils.supabase.supabaseUrl);
} else {
    console.log('❌ Main website Supabase client NOT loaded');
}

// Check Academy client
if (typeof window.academySupabaseUtils !== 'undefined') {
    console.log('✅ Academy Supabase client loaded');
    if (window.academySupabaseUtils.isInitialized) {
        console.log('   Status: ✅ Initialized');
        console.log('   URL:', window.academySupabaseUtils.supabase.supabaseUrl);
    } else {
        console.log('   Status: ⚠️  Not initialized (check credentials)');
    }
} else {
    console.log('❌ Academy Supabase client NOT loaded');
}

console.log('📋 Verification complete!');
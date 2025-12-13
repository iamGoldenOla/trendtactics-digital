/**
 * Create Test User for Trendtactics Academy
 * 
 * This script creates a test user in your Supabase Academy project
 * for testing enrollment and course access functionality.
 */

// Import Supabase client
import { createClient } from '@supabase/supabase-js';

// Academy Supabase configuration
// NOTE: Replace these with your actual Academy project credentials
const SUPABASE_URL = 'https://uimdbodamoeyukrghchb.supabase.co';
const SUPABASE_KEY = 'YOUR_ACADEMY_ANON_KEY'; // Replace with your actual anon key

// Test user credentials (using preferred email domain)
const TEST_USER = {
  email: 'test@edvouralearninghub.com',
  password: 'TestPass123!',
  firstName: 'Academy',
  lastName: 'Tester'
};

async function createTestUser() {
  try {
    console.log('🚀 Creating test user for Trendtactics Academy...');
    
    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Sign up the test user
    const { data, error } = await supabase.auth.signUp({
      email: TEST_USER.email,
      password: TEST_USER.password,
      options: {
        data: {
          first_name: TEST_USER.firstName,
          last_name: TEST_USER.lastName
        }
      }
    });
    
    if (error) {
      if (error.message.includes('already registered')) {
        console.log('✅ Test user already exists. You can use these credentials:');
        console.log(`📧 Email: ${TEST_USER.email}`);
        console.log(`🔑 Password: ${TEST_USER.password}`);
        return;
      }
      throw error;
    }
    
    console.log('✅ Test user created successfully!');
    console.log(`📧 Email: ${TEST_USER.email}`);
    console.log(`🔑 Password: ${TEST_USER.password}`);
    console.log(`👤 User ID: ${data.user.id}`);
    
    // Add user to profiles table (if it exists)
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          first_name: TEST_USER.firstName,
          last_name: TEST_USER.lastName,
          email: TEST_USER.email,
          updated_at: new Date()
        });
      
      if (profileError) {
        console.log('⚠️ Note: Profiles table may not exist yet. This is fine for testing.');
      } else {
        console.log('✅ User profile created/updated');
      }
    } catch (profileErr) {
      console.log('ℹ️ Profiles table not found - this is normal during initial setup');
    }
    
  } catch (error) {
    console.error('❌ Error creating test user:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Check that your Supabase URL and ANON key are correct');
    console.log('2. Ensure your Supabase project is accessible');
    console.log('3. Verify network connectivity');
    console.log('4. Check Supabase Auth settings');
  }
}

// Run the function
createTestUser();

export { createTestUser };
/**
 * Deployment Monitor Script
 * 
 * This script monitors the deployment status and provides real-time updates
 */

import https from 'https';
import { execSync } from 'child_process';

console.log('🔍 Deployment Monitor');
console.log('===================');
console.log();

// Display deployment information
const repoOwner = 'iamGoldenOla';
const repoName = 'trendtacticsdigital';
const siteUrl = `https://${repoOwner}.github.io/${repoName}`;

console.log('📋 Deployment Details:');
console.log(`   Repository: ${repoOwner}/${repoName}`);
console.log(`   Live Site: ${siteUrl}`);
console.log(`   Branch: main`);
console.log(`   Deployment Method: GitHub Actions (Auto)`);
console.log();

// Check Git status
try {
  console.log('🔍 Git Status:');
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
  
  if (gitStatus) {
    console.log('   ⚠️  Uncommitted changes detected');
  } else {
    console.log('   ✅ All changes committed');
  }
  
  // Check last commit
  const lastCommit = execSync('git log -1 --pretty=format:"%h - %an, %ar : %s"', { encoding: 'utf8' }).trim();
  console.log(`   Last Commit: ${lastCommit}`);
  
} catch (error) {
  console.log('   ❌ Could not check Git status');
}

console.log();

// Test site availability with multiple attempts
console.log('📡 Testing Site Availability:');
console.log(`   Testing: ${siteUrl}`);

let attempts = 0;
const maxAttempts = 12; // 2 minutes with 10-second intervals
const intervalTime = 10000; // 10 seconds

const checkSite = () => {
  attempts++;
  console.log(`   Attempt ${attempts}/${maxAttempts}...`);
  
  return new Promise((resolve) => {
    const req = https.get(siteUrl, (res) => {
      console.log(`   Response: ${res.statusCode}`);
      
      if (res.statusCode === 200) {
        console.log('   ✅ SUCCESS! Site is live and accessible');
        console.log();
        console.log('🎉 DEPLOYMENT COMPLETE!');
        console.log(`🔗 Visit your live site: ${siteUrl}`);
        console.log();
        console.log('📋 What to Test:');
        console.log('   1. Click "Get Started" button');
        console.log('   2. Verify authentication requirement');
        console.log('   3. Test regular user login');
        console.log('   4. Test admin user login (email with "admin")');
        console.log('   5. Check dashboard access');
        resolve(true);
      } else if (res.statusCode === 404) {
        console.log('   ⏳ Still deploying (404 - Not Found)');
        resolve(false);
      } else {
        console.log(`   ⚠️  Unexpected status: ${res.statusCode}`);
        resolve(false);
      }
    });
    
    req.on('error', (e) => {
      console.log(`   ❌ Error: ${e.message}`);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log('   ⏰ Request timeout');
      req.destroy();
      resolve(false);
    });
  });
};

const monitorDeployment = async () => {
  console.log();
  console.log('⏱️  Monitoring Deployment (Up to 2 minutes)...');
  console.log();
  
  for (let i = 0; i < maxAttempts; i++) {
    const success = await checkSite();
    
    if (success) {
      return;
    }
    
    if (i < maxAttempts - 1) {
      console.log(`   Waiting ${intervalTime/1000} seconds before next check...`);
      console.log();
      await new Promise(resolve => setTimeout(resolve, intervalTime));
    }
  }
  
  console.log();
  console.log('⏰ Deployment Monitoring Complete');
  console.log('==============================');
  console.log();
  console.log('⚠️  Deployment may still be in progress');
  console.log('   - First deployment can take 2-5 minutes');
  console.log('   - GitHub Actions may have a queue');
  console.log();
  console.log('📋 Next Steps:');
  console.log('   1. Wait a few more minutes');
  console.log('   2. Check GitHub Actions tab for progress');
  console.log('   3. Visit your site manually in 5-10 minutes');
  console.log();
  console.log(`🔗 Manual Check: ${siteUrl}`);
  console.log();
  console.log('🔄 Future updates will deploy automatically!');
};

// Run the monitor
monitorDeployment();
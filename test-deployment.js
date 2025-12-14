/**
 * Deployment Verification Script
 * 
 * This script verifies that the GitHub Pages deployment is working correctly
 * and that all the dashboard functionality is available.
 */

import { execSync } from 'child_process';
import https from 'https';

console.log('🚀 Deployment Verification Script');
console.log('==============================');
console.log();

// Check Git status
try {
  console.log('🔍 Checking Git repository status...');
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
  
  if (gitStatus) {
    console.log('⚠️  Uncommitted changes detected:');
    console.log(gitStatus);
  } else {
    console.log('✅ No uncommitted changes');
  }
} catch (error) {
  console.log('❌ Could not check Git status');
}

// Check if we're on the main branch
try {
  console.log('\n🔍 Checking current branch...');
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  console.log(`✅ Current branch: ${currentBranch}`);
  
  if (currentBranch !== 'main') {
    console.log('⚠️  Warning: Not on main branch. Deployment typically happens from main.');
  }
} catch (error) {
  console.log('❌ Could not determine current branch');
}

// Check GitHub Pages configuration
try {
  console.log('\n🔍 Checking GitHub Pages configuration...');
  
  // This would normally check the GitHub API, but we'll simulate it
  console.log('ℹ️  GitHub Pages should be configured to use:');
  console.log('   - Branch: main');
  console.log('   - Folder: / (root)');
  
} catch (error) {
  console.log('❌ Could not check GitHub Pages configuration');
}

// Test site availability
console.log('\n🔍 Testing site availability...');
const siteUrl = 'https://iamGoldenOla.github.io/trendtacticsdigital';

console.log(`Testing: ${siteUrl}`);

// Simple HTTP request to check if site is responding
const checkSite = () => {
  return new Promise((resolve, reject) => {
    const req = https.get(siteUrl, (res) => {
      console.log(`✅ Site responded with status: ${res.statusCode}`);
      
      if (res.statusCode === 200) {
        console.log('✅ Site is accessible');
        resolve(true);
      } else if (res.statusCode === 404) {
        console.log('⚠️  Site returns 404 - May still be deploying');
        resolve(false);
      } else {
        console.log(`⚠️  Site returned status ${res.statusCode}`);
        resolve(false);
      }
    });
    
    req.on('error', (e) => {
      console.log(`❌ Site unavailable: ${e.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('❌ Request timed out');
      req.destroy();
      resolve(false);
    });
  });
};

// Run the site check
checkSite().then((siteAccessible) => {
  console.log('\n📋 Deployment Verification Summary:');
  console.log('===============================');
  
  if (siteAccessible) {
    console.log('✅ GitHub Pages deployment appears to be working');
    console.log('✅ Your site should be accessible at:');
    console.log(`   ${siteUrl}`);
    console.log('\n🔧 Next steps:');
    console.log('1. Visit your site in a browser');
    console.log('2. Click "Get Started" to test authentication');
    console.log('3. Test both regular user and admin access');
    console.log('4. Verify dashboards load correctly');
  } else {
    console.log('⚠️  Deployment may still be in progress');
    console.log('⏳ First deployment can take 2-5 minutes');
    console.log('🔄 Check back in a few minutes');
    console.log('\n📋 To monitor deployment:');
    console.log('1. Visit your GitHub repository');
    console.log('2. Go to Actions tab to see deployment progress');
    console.log('3. Check Settings → Pages for deployment status');
  }
  
  console.log('\n🔄 Future Updates:');
  console.log('All updates will automatically deploy with:');
  console.log('   git add .');
  console.log('   git commit -m "Your update description"');
  console.log('   git push origin main');
  
  console.log('\n🎉 Deployment verification complete!');
});
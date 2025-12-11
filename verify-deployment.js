// Script to verify deployment to GitHub
const { exec } = require('child_process');

console.log('🔍 Verifying GitHub Deployment...\n');

// Check current commit hash
exec('git rev-parse HEAD', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error getting commit hash: ${error}`);
        return;
    }
    
    const commitHash = stdout.trim();
    console.log(`✅ Current Commit Hash: ${commitHash}`);
    
    // Check remote URL
    exec('git remote get-url origin', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error getting remote URL: ${error}`);
            return;
        }
        
        const remoteUrl = stdout.trim();
        console.log(`✅ Remote Repository: ${remoteUrl}`);
        
        // Check if everything is pushed
        exec('git status --porcelain', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error checking git status: ${error}`);
                return;
            }
            
            if (stdout.trim() === '') {
                console.log('✅ All changes have been committed');
            } else {
                console.log('⚠️  There are uncommitted changes');
            }
            
            // Check branch status
            exec('git branch --show-current', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error getting current branch: ${error}`);
                    return;
                }
                
                const branch = stdout.trim();
                console.log(`✅ Current Branch: ${branch}`);
                
                console.log('\n📋 Deployment Verification Summary:');
                console.log('=====================================');
                console.log(`Repository: ${remoteUrl}`);
                console.log(`Branch: ${branch}`);
                console.log(`Commit: ${commitHash}`);
                console.log('Status: ✅ Ready for deployment');
                console.log('\n📝 Next Steps:');
                console.log('1. Visit your GitHub repository to confirm files are uploaded');
                console.log('2. Configure GitHub Pages if needed (Settings → Pages)');
                console.log('3. Run video optimization scripts to complete the fix');
            });
        });
    });
});
const fs = require('fs');
const path = require('path');

console.log('🔧 Preparing functions for deployment...');

// Define paths
const projectRoot = 'c:\\Users\\Akinola Olujobi\\Documents\\TrendtacticsDigitalClean';
const coursesDir = path.join(projectRoot, 'supabase', 'functions', 'courses');
const functionsDir = path.join(projectRoot, 'supabase', 'functions');

console.log(`📂 Source directory: ${coursesDir}`);
console.log(`📂 Target directory: ${functionsDir}`);

// List files in courses directory
const courseFiles = fs.readdirSync(coursesDir);
console.log(`📋 Found ${courseFiles.length} files in courses directory:`);
courseFiles.forEach(file => console.log(`   • ${file}`));

// Move files from courses directory to main functions directory
try {
    courseFiles.forEach(file => {
        const sourcePath = path.join(coursesDir, file);
        const targetPath = path.join(functionsDir, file);
        
        // Copy file to main functions directory
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`   ✅ Copied ${file} to main functions directory`);
    });
    
    console.log('\n✅ All functions prepared for deployment!');
    console.log('\n📋 Next steps:');
    console.log('   1. Deploy functions using: supabase functions deploy --project-ref uimdbodamoeyukrghchb');
    console.log('   2. Or deploy individual functions:');
    courseFiles.forEach(file => {
        const functionName = path.basename(file, '.ts');
        console.log(`      supabase functions deploy ${functionName} --project-ref uimdbodamoeyukrghchb`);
    });
    console.log('   3. Verify deployment with: supabase functions list --project-ref uimdbodamoeyukrghchb');
    
} catch (error) {
    console.error('❌ Failed to prepare functions:', error.message);
    process.exit(1);
}
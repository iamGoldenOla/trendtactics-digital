const fs = require('fs');
const path = require('path');

console.log('🔧 Copying _utils to function directories...');

// Define paths
const projectRoot = 'c:\\Users\\Akinola Olujobi\\Documents\\TrendtacticsDigitalClean';
const functionsDir = path.join(projectRoot, 'supabase', 'functions');
const utilsDir = path.join(functionsDir, '_utils');

console.log(`📂 Source _utils directory: ${utilsDir}`);

// List function directories
const functionDirs = [
    'enroll',
    'get-course',
    'get-courses',
    'get-enrollments',
    'update-progress'
];

console.log(`📋 Found ${functionDirs.length} function directories:`);
functionDirs.forEach(dir => console.log(`   • ${dir}`));

// Copy _utils directory to each function directory
try {
    functionDirs.forEach(funcDir => {
        const targetUtilsDir = path.join(functionsDir, funcDir, '_utils');
        
        // Create _utils directory in function directory
        if (!fs.existsSync(targetUtilsDir)) {
            fs.mkdirSync(targetUtilsDir, { recursive: true });
            console.log(`   ✅ Created _utils directory in ${funcDir}`);
        }
        
        // Copy files from source _utils to target _utils
        const utilsFiles = fs.readdirSync(utilsDir);
        utilsFiles.forEach(file => {
            const sourceFile = path.join(utilsDir, file);
            const targetFile = path.join(targetUtilsDir, file);
            
            // Copy file
            fs.copyFileSync(sourceFile, targetFile);
            console.log(`      ✅ Copied ${file} to ${funcDir}/_utils/`);
        });
    });
    
    console.log('\n✅ All _utils directories copied successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Deploy all functions using: supabase functions deploy --project-ref uimdbodamoeyukrghchb');
    console.log('   2. Or deploy individual functions:');
    functionDirs.forEach(dir => {
        console.log(`      supabase functions deploy ${dir} --project-ref uimdbodamoeyukrghchb`);
    });
    console.log('   3. Verify deployment with: supabase functions list --project-ref uimdbodamoeyukrghchb');
    
} catch (error) {
    console.error('❌ Failed to copy _utils directories:', error.message);
    process.exit(1);
}
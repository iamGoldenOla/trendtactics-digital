const fs = require('fs');
const path = require('path');

console.log('🔧 Reorganizing functions for Supabase CLI...');

// Define paths
const projectRoot = 'c:\\Users\\Akinola Olujobi\\Documents\\TrendtacticsDigitalClean';
const functionsDir = path.join(projectRoot, 'supabase', 'functions');

console.log(`📂 Working in directory: ${functionsDir}`);

// List function files
const functionFiles = [
    'enroll.ts',
    'get-course.ts',
    'get-courses.ts',
    'get-enrollments.ts',
    'update-progress.ts'
];

console.log(`📋 Found ${functionFiles.length} function files to reorganize:`);
functionFiles.forEach(file => console.log(`   • ${file}`));

// Reorganize functions into proper directory structure
try {
    functionFiles.forEach(file => {
        const functionName = path.basename(file, '.ts');
        const functionDir = path.join(functionsDir, functionName);
        const sourceFile = path.join(functionsDir, file);
        const targetFile = path.join(functionDir, 'index.ts');
        
        // Create function directory
        if (!fs.existsSync(functionDir)) {
            fs.mkdirSync(functionDir, { recursive: true });
            console.log(`   ✅ Created directory ${functionName}`);
        }
        
        // Move file to function directory as index.ts
        fs.renameSync(sourceFile, targetFile);
        console.log(`   ✅ Moved ${file} to ${functionName}/index.ts`);
    });
    
    console.log('\n✅ All functions reorganized successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Deploy all functions using: supabase functions deploy --project-ref uimdbodamoeyukrghchb');
    console.log('   2. Or deploy individual functions:');
    functionFiles.forEach(file => {
        const functionName = path.basename(file, '.ts');
        console.log(`      supabase functions deploy ${functionName} --project-ref uimdbodamoeyukrghchb`);
    });
    console.log('   3. Verify deployment with: supabase functions list --project-ref uimdbodamoeyukrghchb');
    
} catch (error) {
    console.error('❌ Failed to reorganize functions:', error.message);
    process.exit(1);
}
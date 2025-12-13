const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing import paths in functions...');

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

console.log(`📋 Found ${functionFiles.length} function files to fix:`);
functionFiles.forEach(file => console.log(`   • ${file}`));

// Fix import paths in each function file
try {
    functionFiles.forEach(file => {
        const filePath = path.join(functionsDir, file);
        
        // Read file content
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Fix import paths
        const oldImportPattern = /import\s+\{[^}]+\}\s+from\s+"(\.\.\/_utils\/[^"]+)"/g;
        const newContent = content.replace(oldImportPattern, (match, importPath) => {
            // Change ../_utils/ to ./_utils/
            const newImportPath = importPath.replace('../_utils/', './_utils/');
            return match.replace(importPath, newImportPath);
        });
        
        // Also fix any other relative imports that might be broken
        const oldRelativePattern = /from\s+"(\.\.\/[^"]+)"/g;
        const finalContent = newContent.replace(oldRelativePattern, (match, importPath) => {
            // Change ../ to ./ for relative imports
            const newImportPath = importPath.replace('../', './');
            return match.replace(importPath, newImportPath);
        });
        
        // Write updated content back to file
        fs.writeFileSync(filePath, finalContent, 'utf8');
        console.log(`   ✅ Fixed import paths in ${file}`);
    });
    
    console.log('\n✅ All import paths fixed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Deploy functions using: supabase functions deploy --project-ref uimdbodamoeyukrghchb');
    console.log('   2. Or deploy individual functions:');
    functionFiles.forEach(file => {
        const functionName = path.basename(file, '.ts');
        console.log(`      supabase functions deploy ${functionName} --project-ref uimdbodamoeyukrghchb`);
    });
    console.log('   3. Verify deployment with: supabase functions list --project-ref uimdbodamoeyukrghchb');
    
} catch (error) {
    console.error('❌ Failed to fix import paths:', error.message);
    process.exit(1);
}
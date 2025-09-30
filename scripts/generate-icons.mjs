#!/usr/bin/env node

/**
 * Icon Generation Script
 * 
 * This script generates icon components from SVG files.
 * Place SVG files in the public/icons directory and run this script
 * to generate React components for them.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../public/icons');
const outputDir = path.join(__dirname, '../src/components/icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to convert SVG to React component
function svgToReactComponent(svgContent, iconName) {
  // Remove XML declaration and DOCTYPE
  let cleanedSvg = svgContent
    .replace(/<\?xml[^>]*>/g, '')
    .replace(/<!DOCTYPE[^>]*>/g, '')
    .trim();

  // Convert SVG attributes to React props
  cleanedSvg = cleanedSvg
    .replace(/class=/g, 'className=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/view-box=/g, 'viewBox=');

  // Add React component wrapper
  const component = `import React from 'react';

interface ${iconName}Props {
  className?: string;
  size?: number;
  color?: string;
}

export const ${iconName}: React.FC<${iconName}Props> = ({ 
  className = '', 
  size = 24, 
  color = 'currentColor' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ color }}
    >
      ${cleanedSvg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
    </svg>
  );
};

export default ${iconName};
`;

  return component;
}

// Function to convert filename to PascalCase
function toPascalCase(str) {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// Main function
function generateIcons() {
  console.log('🎨 Generating icon components...');

  if (!fs.existsSync(iconsDir)) {
    console.log('📁 Creating icons directory...');
    fs.mkdirSync(iconsDir, { recursive: true });
    console.log('✅ Icons directory created at:', iconsDir);
    console.log('💡 Place your SVG files in this directory and run the script again.');
    return;
  }

  const svgFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

  if (svgFiles.length === 0) {
    console.log('📁 No SVG files found in:', iconsDir);
    console.log('💡 Place your SVG files in this directory and run the script again.');
    return;
  }

  console.log(`📄 Found ${svgFiles.length} SVG files`);

  let generatedCount = 0;
  let errorCount = 0;

  svgFiles.forEach(file => {
    try {
      const svgPath = path.join(iconsDir, file);
      const svgContent = fs.readFileSync(svgPath, 'utf8');
      
      const iconName = toPascalCase(path.parse(file).name);
      const componentContent = svgToReactComponent(svgContent, iconName);
      
      const outputPath = path.join(outputDir, `${iconName}.tsx`);
      fs.writeFileSync(outputPath, componentContent);
      
      console.log(`✅ Generated: ${iconName}.tsx`);
      generatedCount++;
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
      errorCount++;
    }
  });

  // Generate index file
  const indexContent = svgFiles
    .map(file => {
      const iconName = toPascalCase(path.parse(file).name);
      return `export { ${iconName} } from './${iconName}';`;
    })
    .join('\n');

  fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
  console.log('✅ Generated index.ts');

  console.log(`\n🎉 Icon generation complete!`);
  console.log(`✅ Generated: ${generatedCount} components`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount} files`);
  }
  console.log(`📁 Output directory: ${outputDir}`);
}

// Run the script
generateIcons();

const fs = require('fs');
const path = require('path');

const srcDirectory = './src';
const packageJsonPath = './package.json';

function hasIndexTs(dirPath) {
  try {
    // Read the contents of the directory
    const files = fs.readdirSync(dirPath);

    // Check if 'index.ts' is among the files
    return files.includes('index.ts');
  } catch (error) {
    console.error(`Error reading directory: ${dirPath}`, error);
    return false;
  }
}

const getDirectoriesRecursively = (dir, baseDir = '') => {
  const directories = [''];

  // Read the contents of the directory
  const items = fs.readdirSync(dir, { withFileTypes: true });

  // Iterate over each item
  for (const item of items) {
    if (item.isDirectory()) {
      const relativePath = path.join(baseDir, item.name);
      if (hasIndexTs(path.join(dir, item.name))) {
        directories.push(relativePath + '/');
      }

      // Recursively read subdirectories
      const subdirectories = getDirectoriesRecursively(path.join(dir, item.name), relativePath);
      directories.push(...subdirectories);
    }

    if (item.isFile() && item.name.endsWith('ts') && !item.name.endsWith('.spec.ts') && item.name !== 'index.ts') {
      const relativePath = path.join(baseDir, path.parse(item.name).name);
      directories.push(relativePath);
    }
  }

  return directories;
};

const directories = getDirectoriesRecursively(srcDirectory).reduce((acc, path) => {
  const isDir = path.endsWith('/');

  if (isDir || path === '') {
    if (path === '') {
      acc['.'] = './dist/index.js';
    } else {
      acc[`./${path.replace(/\/$/, '')}`] = `./dist/${path.replace(/\/$/, '')}/index.js`;
    }
  } else {
    if (path !== '') {
      acc[`./${path}`] = `./dist/${path}.js`;
    }
  }

  return acc;
}, {});

// Reading and updating package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
packageJson.exports = directories;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

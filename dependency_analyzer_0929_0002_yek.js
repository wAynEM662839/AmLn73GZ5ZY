// 代码生成时间: 2025-09-29 00:02:46
// Import necessary modules
const fs = require('fs');
const path = require('path');

// Function to read the package.json file
function readPackageJson(filePath) {
    try {
        const rawdata = fs.readFileSync(filePath);
        return JSON.parse(rawdata);
    } catch (e) {
        throw new Error(`Error reading package.json: ${e.message}`);
    }
}

// Function to analyze dependencies
function analyzeDependencies(packageJson) {
    if (!packageJson || typeof packageJson !== 'object') {
        throw new Error('Invalid package.json content');
    }

    // Initialize an empty object to store dependency analysis
    const dependencies = {};

    // Analyze 'dependencies', 'devDependencies', 'optionalDependencies', and 'peerDependencies'
    const dependencyTypes = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
    dependencyTypes.forEach((type) => {
        if (packageJson[type]) {
            Object.keys(packageJson[type]).forEach((dependency) => {
                dependencies[dependency] = dependencies[dependency] || [];
                dependencies[dependency].push(type);
            });
        }
    });

    return dependencies;
}

// Function to print the analysis results
function printAnalysis(dependencies) {
    console.log('Dependency Analysis Results:');
    Object.keys(dependencies).forEach((dependency) => {
        console.log(`${dependency}: ${dependencies[dependency].join(', ')}`);
    });
}

// Main function to run the analyzer
function main() {
    const packageJsonPath = path.join(__dirname, 'package.json');

    // Read the package.json file
    const packageJson = readPackageJson(packageJsonPath);

    // Analyze the dependencies
    const dependencies = analyzeDependencies(packageJson);

    // Print the analysis results
    printAnalysis(dependencies);
}

// Run the main function
main();
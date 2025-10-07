// 代码生成时间: 2025-10-07 16:12:56
 * files into their respective directories based on file extensions.
 * @author Your Name
 * @version 1.0.0
 */

// Import required modules
const fs = require('fs');
const path = require('path');

// Define the file extension to directory mapping
const fileExtensionMap = {
    '.js': 'js',
    '.json': 'json',
    '.html': 'html',
    '.css': 'css',
    '.png': 'images',
    '.jpg': 'images',
    '.gif': 'images',
    '.svg': 'images',
    // Add more file types and directories as needed
};

// Function to create a directory if it doesn't exist
function createDirectoryIfNotExists(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (error) {
        console.error('Error creating directory:', error);
        throw error;
    }
}

// Function to move a file to its respective directory
function moveFileToDirectory(srcPath, destDirPath) {
    try {
        const destPath = path.join(destDirPath, path.basename(srcPath));
        fs.renameSync(srcPath, destPath);
        console.log(`File moved: ${srcPath} -> ${destPath}`);
    } catch (error) {
        console.error('Error moving file:', error);
        throw error;
    }
}

// Function to organize folder structure
function organizeFolderStructure(sourceDir) {
    try {
        // Check if the source directory exists
        if (!fs.existsSync(sourceDir)) {
            console.error('Source directory does not exist:', sourceDir);
            return;
        }

        // Read all files in the source directory
        fs.readdirSync(sourceDir).forEach(file => {
            const fullPath = path.join(sourceDir, file);
            const stats = fs.statSync(fullPath);

            // Check if it's a file
            if (stats.isFile()) {
                const extension = path.extname(file);
                const destDir = path.join(sourceDir, fileExtensionMap[extension]);

                // Create the directory if it doesn't exist
                createDirectoryIfNotExists(destDir);

                // Move the file to the respective directory
                moveFileToDirectory(fullPath, destDir);
            }
        });

        console.log('Folder structure has been organized.');
    } catch (error) {
        console.error('An error occurred during folder organization:', error);
    }
}

// Example usage:
// organizeFolderStructure('./source_directory');

// Export the organizeFolderStructure function for use in other scripts
module.exports = {
    organizeFolderStructure,
};
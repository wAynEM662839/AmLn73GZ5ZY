// 代码生成时间: 2025-09-23 00:40:49
 * Usage:
 *   const unzipUtil = new UnzipTool();
 *   unzipUtil.extractFile('path/to/compressed/file.zip', 'path/to/destination/folder');
 */

import { Injectable } from '@angular/core';
import * as pako from 'pako';

@Injectable({
  providedIn: 'root'
})
export class UnzipTool {
  // Constructor
  constructor() {}

  /**
   * Extracts a compressed file to a specified destination folder.
   *
   * @param {string} compressedFilePath - The path to the compressed file.
   * @param {string} destinationFolderPath - The path to the destination folder.
   * @returns {Promise<void>} A promise that resolves when extraction is complete.
   */
  extractFile(compressedFilePath: string, destinationFolderPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Read the compressed file
      const readFile = new Promise((resolveFile, rejectFile) => {
        window.resolveLocalFileSystemURL(compressedFilePath, (fileEntry) => {
          fileEntry.file((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolveFile(reader.result);
            };
            reader.readAsArrayBuffer(file);
          }, rejectFile);
        }, rejectFile);
      });

      // Uncompress the file using pako
      const uncompressFile = (fileContent) => {
        try {
          const decompressed = pako.inflate(fileContent);
          const decompressedText = new TextDecoder('utf-8').decode(decompressed);

          // Write the decompressed content to the destination folder
          const writeFile = new Promise((resolveWrite, rejectWrite) => {
            window.resolveLocalFileSystemURL(destinationFolderPath, (directoryEntry) => {
              directoryEntry.getFile('extracted_data', { create: true }, (fileEntry) => {
                fileEntry.createWriter((fileWriter) => {
                  fileWriter.onwrite = () => {
                    resolveWrite();
                  };
                  fileWriter.onerror = rejectWrite;
                  fileWriter.write(decompressedText);
                }, rejectWrite);
              }, rejectWrite);
            }, rejectWrite);
          });

          return writeFile;
        } catch (error) {
          return Promise.reject(error);
        }
      };

      // Execute the operations
      readFile
        .then(uncompressFile)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }
}

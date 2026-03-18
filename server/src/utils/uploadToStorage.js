const { bucket } = require('../config/firebase');

/**
 * Uploads a file buffer to Firebase Storage and makes it public.
 * 
 * @param {Buffer} fileBuffer - The memory buffer of the uploaded file
 * @param {string} destination - The destination path in the bucket (e.g. 'events/eventId.jpg')
 * @param {string} mimetype - The mimetype of the file
 * @returns {Promise<string>} - The public download URL
 */
const uploadToStorage = async (fileBuffer, destination, mimetype) => {
  try {
    const file = bucket.file(destination);
    
    await file.save(fileBuffer, {
      metadata: {
        contentType: mimetype,
      },
    });

    await file.makePublic();
    
    // The public URL format for Google Cloud Storage
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    
    return publicUrl;
  } catch (error) {
    console.error('Error uploading to storage:', error);
    throw new Error('Failed to upload file to storage');
  }
};

/**
 * Deletes a file from Firebase Storage.
 * 
 * @param {string} filePath - The path of the file in the bucket
 */
const deleteFromStorage = async (filePath) => {
  try {
    const file = bucket.file(filePath);
    await file.delete();
  } catch (error) {
    console.error(`Error deleting file from storage (${filePath}):`, error);
    // Suppress error if file doesn't exist
    if (error.code !== 404) {
      throw new Error('Failed to delete file from storage');
    }
  }
};

module.exports = {
  uploadToStorage,
  deleteFromStorage
};

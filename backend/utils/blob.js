const { BlobServiceClient } = require('@azure/storage-blob');

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_STORAGE_CONTAINER_NAME
);

const uploadToBlob = async (file) => {
  const blobName = `${Date.now()}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  console.log('blob.js: uploading to Azure Blob container:', process.env.AZURE_STORAGE_CONTAINER_NAME, 'blobName:', blobName);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: {
      blobContentType: file.mimetype
    }
  });

  console.log('blob.js: upload complete. Blob URL:', blockBlobClient.url);

  return blockBlobClient.url;
};

module.exports = uploadToBlob;
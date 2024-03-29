/**
 * Saves an array of image files to an S3 bucket using the AWS SDK.
 * @param {Array} files - An array of image files to be saved to the S3 bucket.
 * @returns {Array} - An array of the filenames of the saved images.
 */
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
// const { ImageStorage } = require('custommodules');

/**
 * Saves the given files to an S3 bucket specified in the environment variables.
 * @param {Array} files - An array of files to save to the S3 bucket.
 * @returns {Array} - An array of the filenames of the saved images.
 * @throws {Error} - If there is an issue with the S3 client or the provided files.
 */
const saveImagesToS3Bucket = async (files) => {
  try {
    // const s3client = new ImageStorage();
    // const images = await s3client.saveImages(files);
    // return images;
    const images = []; // new name for the images
    const commands = []; //commands that will be sent synchronously
    const bucketName = process.env.BUCKET_NAME;
    const bucketRegion = process.env.BUCKET_REGION;
    const accessKey = process.env.ACCESS_KEY;
    const secretAccessKey = process.env.SECRET_ACCESS_KEY;

    const s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion,
    });
    files.map((file) => {
      const { originalname } = file; //extract the file name
      const filename = `${uuidv4()}-${originalname.replace(/\.[^.]+$/, '')}`;

      const params = {
        Bucket: bucketName,
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const command = new PutObjectCommand(params);
      commands.push(command);
      images.push(filename);
    });
    await Promise.all(
      commands.map((command) => {
        s3.send(command);
      })
    );
    return images;
  } catch (error) {
    console.error('AWS Persistence error in saveImagesToS3Bucket()', error);
    return null;
  }
};

const getImagesUrlFromS3Buscket = async ({ images }) => {
  try {
    // const s3client = new ImageStorage();
    // const imagesUrl = await s3client.getImages({ images });
    // return imagesUrl;
    const bucketName = process.env.BUCKET_NAME;
    const bucketRegion = process.env.BUCKET_REGION;
    const accessKey = process.env.ACCESS_KEY;
    const secretAccessKey = process.env.SECRET_ACCESS_KEY;

    const s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion,
    });

    const imagesUrl = await Promise.all(
      images.map((image) => {
        const getObjectCommand = new GetObjectCommand({
          Bucket: bucketName,
          Key: image,
        });
        return getSignedUrl(s3, getObjectCommand, { expiresIn: 900 });
      })
    );

    return imagesUrl;
  } catch (error) {
    console.error('AWS Persistence error in getImagesUrlFromS3Buscket()', error);
    return null;
  }
};

module.exports = {
  saveImagesToS3Bucket,
  getImagesUrlFromS3Buscket,
};

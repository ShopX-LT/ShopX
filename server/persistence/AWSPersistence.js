/**
 * Saves an array of image files to an S3 bucket using the AWS SDK.
 * @param {Array} files - An array of image files to be saved to the S3 bucket.
 * @returns {Array} - An array of the filenames of the saved images.
 */
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');

/**
 * Saves the given files to an S3 bucket specified in the environment variables.
 * @param {Array} files - An array of files to save to the S3 bucket.
 * @returns {Array} - An array of the filenames of the saved images.
 * @throws {Error} - If there is an issue with the S3 client or the provided files.
 */
const saveImagesToS3Bucket = async (files) => {
  const bucketName = process.env.BUCKET_NAME;
  const bucketRegion = process.env.BUCKET_REGION;
  const accessKey = process.env.ACCESS_KEY;
  const secretAccessKey = process.env.SECRET_ACCESS_KEY;

  // create the client
  const s3 = new S3Client({
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretAccessKey,
    },
    region: bucketRegion,
  });

  const images = []; // new name for the images
  const commands = []; //commands that will be sent synchronously

  files.map((file) => {
    const { originalname } = file; //extract the file name
    const filename = `${uuidv4()}-${originalname.replace(/\.[^.]+$/, '')}`;
    console.log(filename);

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
};

module.exports = {
  saveImagesToS3Bucket,
};

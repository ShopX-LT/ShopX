const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
/* Returs an array of image names
For each image file, appened uuid to the file name, and push the new name the images array, use an array to store all the commands that need to be sent to s3 and use promise.all to send it all at once*/
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
    const { fieldName } = file; //extract the file name
    const filename = `${uuidv4()}-${fieldName}`;
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

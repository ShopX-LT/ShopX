const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const getImagesUrlFromS3Buscket = async ({ images }) => {
  try {
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
  getImagesUrlFromS3Buscket,
};

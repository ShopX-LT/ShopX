const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

class ImageStorage {
  #newImagesNames = [];
  #commandsToBeSent = []; //commands that will be sent synchronously
  #bucketName = process.env.BUCKET_NAME;
  #bucketRegion = process.env.BUCKET_REGION;
  #accessKey = process.env.ACCESS_KEY;
  #secretAccessKey = process.env.SECRET_ACCESS_KEY;
  s3Client;

  constructor() {
    try {
      this.s3Client = new S3Client({
        credentials: {
          accessKeyId: this.#accessKey,
          secretAccessKey: this.#secretAccessKey,
        },
        region: this.#bucketRegion,
      });
    } catch (err) {
      console.error("Error in creating the image saver", err);
    }
  }

  async saveImages(inputFiles) {
    try {
      inputFiles.map((file) => {
        const { originalname } = file;
        const fileNameWithUUID = `${uuidv4()}-${originalname.replace(
          /\.[^.]+$/,
          ""
        )}`;
        const bucketParams = {
          Bucket: this.#bucketName,
          Key: fileNameWithUUID,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        const saveCommand = new PutObjectCommand(bucketParams);
        this.#commandsToBeSent.push(saveCommand);
        this.#newImagesNames.push(fileNameWithUUID);
      });

      await Promise.all(
        this.#commandsToBeSent.map((command) => {
          this.s3Client.send(command);
        })
      );
      return this.#newImagesNames;
    } catch (error) {
      console.error("Error saving images", error);
      return null;
    }
  }

  async getImages({ images }) {
    try {
      const imagesUrl = await Promise.all(
        images.map((image) => {
          const getObjectCommand = new GetObjectCommand({
            Bucket: this.#bucketName,
            Key: image,
          });
          return getSignedUrl(this.s3Client, getObjectCommand, {
            expiresIn: 900,
          });
        })
      );

      return imagesUrl;
    } catch (error) {
      console.error("An error occurred while getting images", error);
      return null;
    }
  }
}

module.exports = ImageStorage;

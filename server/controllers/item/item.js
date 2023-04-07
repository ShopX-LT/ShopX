const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
// MODELS
const Store = require('../../models/Store');
const Item = require('../../models/Item');
const { formatItem } = require('../utils/formats');

const createItem = async (req, res) => {
  try {
    const data = req.body;
    const store = await Store.findOne({ name: req.auth.store });
    if (!store) {
      return res.status(400).json({ message: 'Invalid store request' });
    }
    // save the images
    const images = await saveImagesToS3Bucket(req.files);
    data['store'] = store.name;
    data['imagePath'] = images;
    const newItem = new Item(data);
    const item = await newItem.save();
    const formattedItem = formatItem(item);
    return res.status(201).json({ item: formattedItem });
  } catch (error) {
    console.error(error);
    return res.send(500).json({ message: 'Internal server error' });
  }
};

const getAllItems = async (req, res) => {
  try {
    const store = await Store.findOne({ name: req.auth.store });
    if (!store) {
      return res.status(400).json({ message: 'Invalid store request' });
    }
    // add queries here
    const { category } = req.query;
    const items = await Item.find({
      store: store,
      category: category ? { $in: [category] } : { $exists: true, $ne: [] },
    }).exec();

    const formattedItems = items.map((item) => {
      return formatItem(item);
    });
    return res.status(200).json({ items: formattedItems });
  } catch (error) {
    console.error(error);

    return res.send(500).json({ message: 'Internal server error' });
  }
};

/* Returs an array of image names
For each image file, appened uuid to the file name, and push the new name the images array, use an array to store all the commands that need to be sent to s3 and use promise.all to send it all at once*/
const saveImagesToS3Bucket = async (files) => {
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
  const images = []; // new name for the images
  const commands = []; //commands that will be sent synchronously
  files.map((file) => {
    const { fieldName } = file; //extract the file name
    const filename = `${uuid()}-${fieldName}`;
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
  createItem,
  getAllItems,
};

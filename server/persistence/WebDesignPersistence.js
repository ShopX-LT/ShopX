const WebDesign = require('../models/WebDesign');

const hexToRGB = (hexColor) => {
  hexColor = hexColor.replace(/^#/, '');
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  return [r, g, b];
};

const RGBToHex = (rgbColor) => {
  const [r, g, b] = rgbColor;
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const getContrastColor = (hexColor) => {
  const [r, g, b] = hexToRGB(hexColor);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;

  if (luminance > 0.5) {
    return '#0F0F0F'; // Return black for light background
  } else {
    return '#F0FFFF'; // Return white for dark background
  }
};

const invertColor = (color) => {
  if (color === '#0F0F0F' || color === '#000000') {
    return '#FFFFFF';
  } else if (color === '#F0FFFF' || color === '#FFFFFF') {
    return '#000000';
  } else {
    return '#888888';
  }
};

const blackOrWhite = (color) => {
  if (color === '#0F0F0F') {
    return '#000000';
  } else if (color === '#F0FFFF') {
    return '#FFFFFF';
  } else {
    return '#888888';
  }
};

const createWebDesign = async ({ heroHeadline, subText, brandColor, storeName }) => {
  const tempBrandColor = brandColor;
  const bgColor = getContrastColor(tempBrandColor);
  try {
    const newDesign = new WebDesign({
      store: storeName,
      mainBackgroundColor: bgColor,
      hero: {
        heroHeadline: heroHeadline,
        heroHeadlineColor: invertColor(bgColor),
        subText: subText,
        subTextColor: invertColor(bgColor),
        actionButtonColor: brandColor,
        actionButtonTextColor: bgColor,
      },
      nav: {
        navTextColor: brandColor,
        navBackgroundColor: blackOrWhite(bgColor),
      },
    });
    const design = await newDesign.save();
    return design;
  } catch (error) {
    console.error('WebDesign Persistence error in createWebDesign()', error);
    return null;
  }
};

const getStoreDesign = async ({ storeName }) => {
  try {
    const design = await WebDesign.findOne({ store: storeName });
    return design;
  } catch (error) {
    console.error('WebDesign Persistence error in getStoreDesign()', error);
    return null;
  }
};

const updateStoreDesign = async ({ storeName, update }) => {
  try {
    const design = await WebDesign.findOneAndUpdate({ store: storeName }, update, { new: true });
    return design;
  } catch (error) {
    console.error('WebDesign Persistence error in updateStoreDesign()', error);
    return null;
  }
};

module.exports = {
  createWebDesign,
  getStoreDesign,
  updateStoreDesign,
};

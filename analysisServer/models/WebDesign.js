const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebDesignScheme = new mongoose.Schema({
  store: { type: String, required: true, trim: true },
  mainBackgroundColor: {
    type: String,
    trim: true,
    default: '#ebebeb',
  },
  hero: {
    heroStyle: {
      type: 'string',
      trim: true,
      default: 'legacy',
      enum: ['legacy', 'minimalist'],
    },
    // HERO TEXT
    heroHeadline: {
      trim: true,
      type: String,
    },
    heroHeadlineColor: {
      trim: true,
      type: String,
      default: '#000000',
    },
    heroSubText: {
      trim: true,
      type: String,
    },
    heroSubTextColor: {
      trim: true,
      type: String,
      default: '#000000',
    },
    // HERO IMAGE
    heroImageUrl: {
      type: String,
    },
    heroImageBlur: {
      type: String,
      trim: true,
      default: '1',
    },
    heroImageCoverOpacity: {
      type: String,
      trim: true,
      default: '0.6',
    },

    // HERO ACTION BUTTON
    heroActionButtonStyle: {
      trim: true,
      type: String,
      default: 'action',
    },
    heroActionButtonText: {
      trim: true,
      type: String,
      default: 'Shop Now!',
    },
    heroActionButtonColor: {
      trim: true,
      type: String,
      default: '#000000',
    },
    heroActionButtonTextColor: {
      trim: true,
      type: String,
      default: '#ffffff',
    },
    // HERO SECONDARY BUTTON
    heroSecondaryButtonLink: {
      trim: true,
      type: String,
    },
    heroSecondaryButtonStyle: {
      trim: true,
      type: String,
    },
    heroSecondaryButtonText: {
      trim: true,
      type: String,
    },
    heroSecondaryButtonColor: {
      trim: true,
      type: String,
      default: '#000000',
    },
    heroSecondaryButtonTextColor: {
      trim: true,
      type: String,
      default: '#ffffff',
    },
  },

  //   PRODUCT CONTAINER
  productContainer: {
    productStyle: {
      type: 'string',
      trim: true,
      default: 'simple',
      enum: ['simple', 'glass'],
    },
    productBackgroundColor: {
      type: 'string',
      trim: true,
      default: '#ebebeb',
    },
    productMainTextColor: {
      type: 'string',
      trim: true,
      default: '#000000',
    },
    productSubTextColor: {
      type: 'string',
      trim: true,
      default: '#303030',
    },
    productActionButtonStyle: {
      type: 'string',
      trim: true,
      default: 'action',
      enum: ['action'],
    },
    productActionButtonText: {
      type: 'string',
      trim: true,
      default: 'ADD TO CART',
    },
    productActionButtonColor: {
      type: 'string',
      trim: true,
      default: '#000000',
    },
    productActionButtonTextColor: {
      type: 'string',
      trim: true,
      default: '#ffffff',
    },
  },
  nav: {
    navTextColor: {
      type: 'string',
      trim: true,
      default: '#ffffff',
    },
    navBackgroundColor: {
      type: 'string',
      trim: true,
      default: '#313131',
    },
  },
});

module.exports = mongoose.model('WebDesign', WebDesignScheme);

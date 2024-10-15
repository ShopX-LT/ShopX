const tinycolor = require('tinycolor2');

/**
 * Creates a splitcomplement colour scheme
 * @param {Object<TinyColor>} baseColor - The splitcomplement scheme starting point.
 * @returns {Array<string>[3]} - All the colors that make up the splitcomplement with the baseColor at [0].
 */
const getSplitComplementColorScheme = (baseColor) => {
  const colors = baseColor.splitcomplement();
  const splitcomplementColors = colors.map((color) => {
    return color.toHexString();
  });
  return splitcomplementColors;
};

/**
 * Creates a Triad colour scheme
 * @param {Object<TinyColor>} baseColor - The splitcomplement scheme starting point.
 * @returns {Array<string>[3]} - All the colors that make up the triad with the baseColor at [0].
 */
const getTriadColorScheme = (baseColor) => {
  const colors = baseColor.triad();
  const triadColors = colors.map((color) => {
    return color.toHexString();
  });
  return triadColors;
};

/**
 * Creates a Tetrad colour scheme
 * @param {Object<TinyColor>} baseColor - The splitcomplement scheme starting point.
 * @returns {Array<string>[4]} - All the colors that make up the tetrad with the baseColor at [0] .
 */
const getTetradColorScheme = (baseColor) => {
  const colors = baseColor.tetrad();
  const tetradColors = colors.map((color) => {
    return color.toHexString();
  });
  return tetradColors;
};

const getGPTColorScheme = (originalColor) => {
  const baseColor = '#' + originalColor.toString().trim();
  // Function to lighten or darken a color
  function adjustColor(color, amount) {
    return (
      '#' +
      color
        .replace(/^#/, '')
        .replace(/../g, (color) =>
          ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).slice(-2)
        )
    );
  }

  // Create palette variations
  const lighterColor = adjustColor(baseColor, Math.random(30) + 30); // Lighter variation
  const darkerColor = adjustColor(baseColor, Math.random(30) - 30); // Darker variation
  const complementaryColor =
    '#' + ('000000' + (0xffffff ^ parseInt(baseColor.substring(1), 16)).toString(16)).slice(-6); // Complementary color

  // Return the color palette
  return [baseColor, lighterColor, darkerColor, complementaryColor];
};

const convertToTinyColorObject = (baseColor) => {
  const defaultColor = '#fff';
  const color = tinycolor(baseColor);
  if (!color.isValid()) {
    return tinycolor(defaultColor);
  }
  return color;
};
const selectColorScheme = (scheme, baseColor) => {
  const color = convertToTinyColorObject(baseColor);
  switch (scheme) {
    case 'splitComplement':
      return getSplitComplementColorScheme(color);
    case 'triadColorScheme':
      return getTriadColorScheme(color);
    case 'tetradColorScheme':
      return getTetradColorScheme(color);
    default:
      return ['#fff', '#000', '#0f0'];
  }
};

const getAllColorSchemes = (baseColor) => {
  const color = convertToTinyColorObject(baseColor);
  const splitComplement = getSplitComplementColorScheme(color);
  const triadColorScheme = getTriadColorScheme(color);
  const tetradColorScheme = getTetradColorScheme(color);
  const gptColorScheme = getGPTColorScheme(baseColor);
  const schemes = [splitComplement, triadColorScheme, tetradColorScheme, gptColorScheme];
  return schemes;
};

module.exports = {
  selectColorScheme,
  getAllColorSchemes,
};

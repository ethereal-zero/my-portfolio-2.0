import tinyColor from 'tinycolor2';

export const isColorDark = (color) => {
  return tinyColor(color).isDark();
};

export const getColorAnalogous = (color) => {
  return tinyColor(color)
    .analogous()
    .map((c) => c.toHexString());
};

export const getColorMonoChromatic = (color) => {
  return tinyColor(color)
    .monochromatic()
    .map((c) => c.toHexString());
};

export const getColorSplitComplement = (color) => {
  return tinyColor(color)
    .splitcomplement()
    .map((c) => c.toHexString());
};

export const getColorTriad = (color) => {
  return tinyColor(color)
    .triad()
    .map((c) => c.toHexString());
};

export const getColorTetrad = (color) => {
  return tinyColor(color)
    .tetrad()
    .map((c) => c.toHexString());
};

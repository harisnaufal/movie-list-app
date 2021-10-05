import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('screen');

const scale = width / 320;

export const Sizing = {
  SCREENWIDTH: width,
  SCREENHEIGHT: height,
  PRODUCTCARDSIZE: width * 0.34,
  CATEGORYCARDSIZE: width / 4 - 20,
  normalize: (size) => {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  },
};

import { StyleSheet } from 'react-native';
import { Fonts, Colors, Sizing } from '../constants';

export const Typography = StyleSheet.create({
  regularText: {
    fontFamily: Fonts.GOTHAMREGULAR,
    fontSize: Sizing.normalize(12),
    color: Colors.PRIMARYBLACK,
  },
  mediumText: {
    fontFamily: Fonts.GOTHAMMEDIUM,
    fontSize: Sizing.normalize(12),
    color: Colors.PRIMARYBLACK,
  },
  boldText: {
    fontFamily: Fonts.GOTHAMBOLD,
    fontSize: Sizing.normalize(12),
    color: Colors.PRIMARYBLACK,
  },
  size: (size) => ({
    fontSize: Sizing.normalize(size),
  }),
});

export const FontStyle = {
  size: (size) => ({ fontSize: Sizing.normalize(size) }),
};

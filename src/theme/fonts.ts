import {TextStyle} from 'react-native/types';
const size = {
  xs: 10,
  s: 12,
  default: 14,
  m: 16,
  l: 18,
  xl: 20,
  xxl: 22,
};

const weight: {[key: string]: TextStyle['fontWeight']} = {
  full: '900',
  semi: '600',
  bold: 'bold',
  normal: 'normal',
  thin: '400',
};

export default {size, weight};

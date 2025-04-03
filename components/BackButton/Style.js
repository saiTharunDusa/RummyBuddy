import {StyleSheet} from 'react-native';
import { horizontalScale, verticalScale } from '../../assets/Scaling';

const Style = StyleSheet.create({
  container: {
    backgroundColor: '#3498db',
    width: horizontalScale(44),
    height: horizontalScale(44),
    borderRadius: horizontalScale(26),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical : verticalScale(12)
  },
});

export default Style;
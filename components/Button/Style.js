import { StyleSheet } from 'react-native';
import { horizontalScale, scaleFontSize, verticalScale } from '../../assets/Scaling';

const Style = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#3498db',
    height: verticalScale(70),
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(25),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 20,
  },
  icon : {
    marginHorizontal : horizontalScale(20),
  },
  buttonText: {
    color: 'white',
    fontSize: scaleFontSize(24),
    fontWeight: 'bold',
  },
});

export default Style;

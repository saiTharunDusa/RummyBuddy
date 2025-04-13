import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/Scaling";

const Style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    title: {
      fontSize: scaleFontSize(32),
      fontWeight: 'bold',
      color: '#3498db',
      textAlign: 'center',
      marginBottom: verticalScale(32),
    },
    input: {
      borderWidth: 1,
      borderColor: '#3498db',
      padding: 12,
      borderRadius: 20,
      marginHorizontal : horizontalScale(16),
      marginBottom: verticalScale(16),
      fontSize: scaleFontSize(16),
      color: '#000',
    },
    button: {
      backgroundColor: '#3498db',
      padding: 14,
      borderRadius: 20,
      alignItems: 'center',
      marginHorizontal : horizontalScale(16),
      marginBottom: verticalScale(16),
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: scaleFontSize(16),
    },
    link: {
      textAlign: 'center',
      color: '#3498db',
      marginTop: verticalScale(10),
      fontSize: scaleFontSize(14),
    },
  });
  

  export default Style;
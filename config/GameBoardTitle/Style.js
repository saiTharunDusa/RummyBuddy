import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize } from "../../assets/Scaling";

const Style = StyleSheet.create({
    mainHeading: {
        color: '#3498db',
        fontSize: scaleFontSize(30),
        marginLeft : horizontalScale(30),
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent : 'center',
        flex: 1,
      },
});

export default Style;
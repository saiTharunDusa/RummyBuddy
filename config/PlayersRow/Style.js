import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../assets/Scaling";

const Style = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(8),
      },
      roundLabel: {
        width: horizontalScale(30),
        fontWeight: 'bold',
        textAlign: 'center',
      },
})

export default Style;
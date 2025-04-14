import { StyleSheet } from "react-native";
import { verticalScale, horizontalScale } from "../../assets/Scaling";

const Style = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: verticalScale(8),
        paddingHorizontal: horizontalScale(8),
        marginHorizontal : horizontalScale(8),
        marginVertical: verticalScale(8)
      },
});

export default Style;
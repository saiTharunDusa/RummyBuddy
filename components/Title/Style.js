import { StyleSheet } from "react-native";
import { scaleFontSize, verticalScale } from "../../assets/Scaling";

const Style = StyleSheet.create({
    titleContainer : {
        height : verticalScale(80),
        alignItems : "center",
        justifyContent : "center",
        backgroundColor: "#3498db" , // Background color
    },
    mainHeading : {
        color : "#FFFFFF",
        fontSize: scaleFontSize(35),
        fontWeight: 'bold',
        textAlign: 'center',      
    },
    tagLine : {
        color : "#FFFFFF",
        fontSize : scaleFontSize(15),
    }
})

export default Style;
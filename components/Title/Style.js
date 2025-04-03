import { StyleSheet } from "react-native";
import { scaleFontSize, verticalScale } from "../../assets/Scaling";

const Style = StyleSheet.create({
    titleContainer : {
        height : verticalScale(100),
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
    },
    logoutButton: {
        position: 'absolute',
        top: 10,
        right: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff44',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
      },
      
      logoutText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: scaleFontSize(12),
      },
      
})

export default Style;
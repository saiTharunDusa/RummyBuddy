import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/Scaling";

const Style = StyleSheet.create({
    titleContainer : {
        height : verticalScale(100),
        alignItems : "center",
        justifyContent : "center",
        backgroundColor: "#3498db" ,
    },
    mainHeading : {
      width : '100%',

        color : "#FFFFFF",
        fontSize: scaleFontSize(35),
        fontWeight: 'bold',
        textAlign: 'center',      
    },
    tagLine : {
        color : "#FFFFFF",
        fontSize : scaleFontSize(15),
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff44',
        padding: 8,
        borderRadius: 6,
      },
      logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff44',
        padding: 8,
        borderRadius: 6,
      },
      
      
      logoutText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: scaleFontSize(12),
      },
      
})

export default Style;
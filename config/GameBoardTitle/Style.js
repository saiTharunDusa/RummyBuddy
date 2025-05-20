import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale, scaleFontSize } from "../../assets/Scaling";

const Style = StyleSheet.create({
    mainHeading: {
        
      },
      buttonText: {
        fontSize: 12,
        color: '#004085', 
        fontWeight: '600',
      },
      smallButton1: {
        fontWeight : 'bold',
        color :'#fff',
        backgroundColor: '#3498db',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: verticalScale(4),
        marginLeft : horizontalScale(4),
      },
      smallButton2: {
        fontWeight : 'bold',
        color :'#fff',
        backgroundColor: '#ff8f00',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: verticalScale(4),
        marginLeft : horizontalScale(4),
        marginLeft : horizontalScale(4),
      },
      smallButton3: {
        fontWeight : 'bold',
        color :'#fff',
        backgroundColor: '#FF0066',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: verticalScale(4),
        marginLeft : horizontalScale(4),
      },
      smallButton4: {
        fontWeight : 'bold',
        color :'#fff',
        backgroundColor: '#ff0000',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: verticalScale(4),
        marginLeft : horizontalScale(4),
      },   
});

export default Style;
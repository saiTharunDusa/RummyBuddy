import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/Scaling";

const Style = StyleSheet.create({
    fab: {
        backgroundColor: '#2980b9',
        padding: 14,
        borderRadius: 30,
        width: horizontalScale(50),
        height: verticalScale(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalBox: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
      },
      modalTitle: {
        fontWeight: 'bold',
        fontSize: scaleFontSize(20),
        marginBottom: verticalScale(12),
        textAlign: 'center',
      },
      scoreInputRow: {
        flexDirection: 'row',
        justifyContent : 'space-around',
        marginBottom: verticalScale(10),
      },
      smallButton: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        backgroundColor: '#cce5ff', 
        borderRadius: 8,
        elevation: 1,
      },
      buttonText: {
        fontSize: 12,
        color: '#004085', 
        fontWeight: '600',
      },    
      playerLabel: {
        width: horizontalScale(20),
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize : scaleFontSize(20)
      },
      playerName: {
        fontSize : scaleFontSize(20)
      },
      modalClose: {
        marginTop: verticalScale(12),
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
      },
      input: {
        flex : 1,
        borderWidth: 1,
        borderColor: '#3498db',
        borderRadius: 6,
        textAlign : 'center',
        paddingHorizontal: horizontalScale(20),
        height: verticalScale(40),
        fontSize : scaleFontSize(20),
      },
      smallButton1: {
        backgroundColor: '#3498db',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: verticalScale(4),
        marginLeft : horizontalScale(4),
        alignSelf: 'flex-start',
      },
      smallButton2: {
        backgroundColor: '#ff8f00',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: verticalScale(4),
        marginLeft : horizontalScale(4),
        alignSelf: 'flex-start',
      },
      smallButton3: {
        backgroundColor: '#FF0066',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: verticalScale(4),
        marginLeft : horizontalScale(4),
        alignSelf: 'flex-start',
      },
      smallButton4: {
        backgroundColor: '#ff0000',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: verticalScale(4),
        marginLeft : horizontalScale(4),
        alignSelf: 'flex-start',
      },

      buttonText: {
        fontSize: scaleFontSize(12),
        color: '#ffffff',
        fontWeight: '600',
      },
      
});

export default Style;
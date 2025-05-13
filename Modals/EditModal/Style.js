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
        alignItems: 'center',
        marginBottom: verticalScale(10),
      },
      playerLabel: {
        width: horizontalScale(20),
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize : scaleFontSize(20)
      },
      playerName: {
        flex: 2,
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
        flex: 1,
        borderWidth: 1,
        borderColor: '#3498db',
        borderRadius: 6,
        textAlign : 'center',
        paddingHorizontal: horizontalScale(10),
        marginLeft: horizontalScale(10),
        height: verticalScale(40),
        fontSize : scaleFontSize(20),
      },
    
});

export default Style;
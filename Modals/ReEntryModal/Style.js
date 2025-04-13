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
      modalClose: {
        marginTop: verticalScale(12),
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
      },
      checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: verticalScale(8),
      },
      
      checkbox: {
        width: horizontalScale(22),
        height: verticalScale(22),
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: horizontalScale(12),
      },
      
      checkboxTick: {
        color: '#fff',
        fontSize: scaleFontSize(14),
        fontWeight: 'bold',
      },
      
      checkboxLabel: {
        fontSize: scaleFontSize(14),
        color: '#333',
        fontWeight: '600',
        fontSize : scaleFontSize(20)
      },
});

export default Style;
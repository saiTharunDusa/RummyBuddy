import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/Scaling";

const Style = StyleSheet.create({
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
        marginBottom: verticalScale(16),
        textAlign: 'center',
      },
      mappingText: {
        textAlign : 'center',
        fontSize: scaleFontSize(20),
        marginBottom: verticalScale(6),
      },
      modalClose: {
        marginTop: verticalScale(12),
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
      },
      fab: {
        backgroundColor: '#2980b9',
        padding: 14,
        borderRadius: 30,
        width: horizontalScale(50),
        height: verticalScale(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Style;
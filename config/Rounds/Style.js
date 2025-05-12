import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/Scaling";

const Style = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginBottom: verticalScale(3),
    },
    roundLabel: {
        width: horizontalScale(30),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical : verticalScale(5),
    },
    cell: {
        borderWidth: 1,
        fontWeight : 'bold',
        borderRadius: 5,
        borderColor: '#3498db',
        textAlign: 'center',
        paddingVertical: verticalScale(6),
        marginHorizontal: horizontalScale(6),
        backgroundColor: '#AED6F1',
    },
    totalRow: {
    backgroundColor: '#E1D5FF',
    paddingVertical : verticalScale(4),
    },
    modalClose: {
        marginTop: verticalScale(12),
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 6,
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
        marginBottom: verticalScale(16),
        textAlign: 'center',
      },
});

export default Style;
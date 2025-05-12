import { StyleSheet } from "react-native";
import { verticalScale, horizontalScale, scaleFontSize } from "../../assets/Scaling";

const Style = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: verticalScale(8),
        paddingHorizontal: horizontalScale(8),
        marginHorizontal: horizontalScale(8),
        marginVertical: verticalScale(8)
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    headerTitle: {
        color: '#3498db',
        fontSize: scaleFontSize(30),
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    gameCard: {
        backgroundColor: '#3498db',
        marginHorizontal: horizontalScale(16),
        marginVertical: verticalScale(8),
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 4,
    },
    gameTitle: {
        fontSize: scaleFontSize(18),
        color: '#fff',
        fontWeight: 'bold'
    },
    gameDate: {
        fontSize: scaleFontSize(14),
        color: '#ecf0f1',
        marginTop: 4
    }
});

export default Style;
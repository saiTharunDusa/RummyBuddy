import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/Scaling";

const Style = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        backgroundColor: '#fff'
    },
    topContainer : {
      flexDirection : 'row',
      width : '90%',
      alignItems : 'center',
      justifyContent: 'flex-start',
      marginTop: verticalScale(20),
    },
    back : {
      marginRight: horizontalScale(20),
    },
    text1 : {
        fontWeight : '900',
        fontSize: scaleFontSize(18),
        color: '#3498db'
    },
    addPlayers : {
        alignItems : 'center',
        backgroundColor : "#87CEEB",
        width : '90%',
        borderRadius : 20,
        marginBottom : verticalScale(15),
    },
    addPlayersButton : {
        backgroundColor: '#3498db',
        padding: 14,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal : horizontalScale(16),
        marginVertical: verticalScale(16),
        fontWeight : '400',
    },
    groupContainer: {
        width: '90%',
        padding: 16,
        backgroundColor : '#87CEEB',
        borderRadius : 20,
        marginBottom : verticalScale(15),
    },
    
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(12),
    },
    
    label: {
        fontSize: scaleFontSize(16),
        backgroundColor: '#BEE4F4',
        padding: 14,
        borderRadius: 20,
        textAlign: 'center',
        width : horizontalScale(120),
        fontWeight : '400',
    },
    
    textInput: {
        borderWidth: 2,
        borderColor: '#3498db',
        borderRadius: 20,
        paddingHorizontal: horizontalScale(10),
        paddingVertical: verticalScale(6),
        width: '40%', 
        fontSize : scaleFontSize(16),
    },

    gameAmountText : {
        borderWidth : horizontalScale(3),
        borderColor : '#3498db',
        borderRadius : 30,
        paddingVertical : verticalScale(8),
        width : '50%',
        fontSize : scaleFontSize(20),
        textAlign : 'center'
    },

    totalGameAmountContainer : {
        width: '90%',
        padding: 16,
        backgroundColor : '#87CEEB',
        borderRadius : 20,
        alignItems : 'center',
        marginBottom : verticalScale(5),
    },

    startGameButton : {
        backgroundColor: '#3498db',
        padding: 14,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal : horizontalScale(16),
        marginVertical: verticalScale(16),
        fontWeight : '400',
        textAlign: 'center'
    }
});

export default Style
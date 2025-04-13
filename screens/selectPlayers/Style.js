import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/Scaling";

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF6FF',
        paddingVertical: verticalScale(20),
      },
      
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3498db',
        textAlign: 'center',
        marginBottom: verticalScale(20),
      },
      
      playerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#87CEEB',
        padding: 16,
        marginBottom: verticalScale(10),
        borderRadius: 10,
      },
      
      playerName: {
        fontSize: scaleFontSize(16),
        fontWeight: '600',
        color: '#003f5c',
      },
      
      checkbox: {
        width: horizontalScale(24),
        height: verticalScale(24),
        borderWidth: 2,
        borderColor: '#3498db',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
      
      checkboxSelected: {
        backgroundColor: '#3498db',
      },
      
      button: {
        backgroundColor: '#3498db',
        padding: 14,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: scaleFontSize(16),
      },

      orderText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: scaleFontSize(14),
      },

      headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(16),
        paddingHorizontal: horizontalScale(16),
      },
      
      back: {
        marginRight: horizontalScale(12),
      },
      
      title: {
        fontSize: scaleFontSize(20),
        fontWeight: 'bold',
        color: '#3498db',
      },
      
      
      
});

export default Style;
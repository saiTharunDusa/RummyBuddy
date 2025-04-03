import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF6FF',
        paddingVertical: 20,
      },
      
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3498db',
        textAlign: 'center',
        marginBottom: 20,
      },
      
      playerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#87CEEB',
        padding: 16,
        marginBottom: 10,
        borderRadius: 10,
      },
      
      playerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#003f5c',
      },
      
      checkbox: {
        width: 24,
        height: 24,
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
        fontSize: 16,
      },

      orderText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
      },

      headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 16,
      },
      
      back: {
        marginRight: 12,
      },
      
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3498db',
      },
      
      
      
});

export default Style;
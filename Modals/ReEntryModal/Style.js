import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    fab: {
        backgroundColor: '#2980b9',
        padding: 14,
        borderRadius: 30,
        width: 50,
        height: 50,
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
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
      },
      modalClose: {
        marginTop: 12,
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
      },
      checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
      },
      
      checkbox: {
        width: 22,
        height: 22,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
      },
      
      checkboxTick: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      },
      
      checkboxLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
      },
});

export default Style;
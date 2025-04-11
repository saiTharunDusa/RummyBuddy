import { StyleSheet } from "react-native";

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
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
      },
      mappingText: {
        textAlign : 'center',
        fontSize: 15,
        marginBottom: 6,
      },
      modalClose: {
        marginTop: 12,
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
      },
      fab: {
        backgroundColor: '#2980b9',
        padding: 14,
        borderRadius: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Style;
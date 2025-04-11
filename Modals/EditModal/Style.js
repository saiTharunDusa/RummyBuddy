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
      scoreInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      playerLabel: {
        width: 20,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      playerName: {
        flex: 2,
      },
      modalClose: {
        marginTop: 12,
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
        paddingHorizontal: 10,
        marginLeft: 10,
        height: 40,
      },
    
});

export default Style;
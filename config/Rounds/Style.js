import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    roundLabel: {
        width: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cell: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#3498db',
        textAlign: 'center',
        paddingVertical: 6,
        marginHorizontal: 6,
        backgroundColor: '#AED6F1',
    },
    totalRow: {
    backgroundColor: '#3fc934',
    },
});

export default Style;
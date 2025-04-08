import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 20,
      backgroundColor: '#f0f8ff',
      margin : 10
    },
    back: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: 10,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#3498db',
      textAlign: 'center',
      flex:1,
    },
    scroll: {
      paddingBottom: 40,
    },
    card: {
      backgroundColor: '#3498db',
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginVertical: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 2,
    },
    name: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    amount: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
    },
  });
export default Style;
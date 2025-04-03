import { StyleSheet } from "react-native";
const Style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {

    borderWidth: 1,
    borderColor: '#3498db',
    padding: 12,
    borderRadius: 20,
    marginHorizontal : 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal : 16,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    color: '#3498db',
    marginTop: 10,
    fontSize: 14,
  },
});


export default Style;
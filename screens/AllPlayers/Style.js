import { StyleSheet } from "react-native";
import { verticalScale, horizontalScale } from "../../assets/Scaling";

const Style = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: verticalScale(8),
        paddingHorizontal: horizontalScale(8),
        marginHorizontal : horizontalScale(8),
        marginVertical: verticalScale(8)
      },
      inputContainer: {
        flexDirection: 'row',
        marginBottom: verticalScale(16),
      },
      textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#3498db',
        paddingVertical: verticalScale(8),
        paddingHorizontal: horizontalScale(8),
        marginRight: horizontalScale(8),
        borderRadius: 10,
      },
      button: {
        backgroundColor: '#3498db',
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(10),
        borderRadius: 10,
        justifyContent: 'center',
      },
      buttonText: {
        color: '#FFF',
        fontWeight: '600',
      },
      playerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(12),
        marginLeft : horizontalScale(10)
      },
      playerName: {
        flex: 1,
        fontSize: 16,
      },
      editInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#3498db',
        paddingHorizontal: horizontalScale(8),
        paddingVertical : verticalScale(8),
        borderRadius: 10,
      },
      editButton: {
        marginLeft: horizontalScale(8),
      },
      removeButton: {
        marginLeft: horizontalScale(8),
      },
      saveButton: {
        marginLeft: horizontalScale(8),
      },
      cancelButton: {
        marginLeft: horizontalScale(8),
      },
})

export default Style;
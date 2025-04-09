import { StyleSheet } from 'react-native';
import { horizontalScale,scaleFontSize,verticalScale } from '../../assets/Scaling';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 10,
  },
  mainHeading: {
    color: '#3498db',
    fontSize: 30,
    marginLeft : 30,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent : 'center',
    flex: 1,
  },
  
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
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

  fabRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#3498db', 
    width: '100%',
  
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
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  settingsLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingsValue: {
    fontSize: 16,
    color: '#555',
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
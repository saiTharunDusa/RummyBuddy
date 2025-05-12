// assets/Style.js
import { StyleSheet } from "react-native";
import { horizontalScale, scaleFontSize, verticalScale } from "../../assets/Scaling";

const Style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(20),
    backgroundColor: '#f0f8ff',
    margin: 10,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(10),
    marginBottom: verticalScale(10),
  },  
  title: {
    fontSize: scaleFontSize(22) || 22,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
    flex: 1,
  },
  // ← New subtitle style for those two lines:
  subtitle: {
    fontSize: scaleFontSize(15) || 15,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
    marginBottom: verticalScale(16),
  },
  scroll: {
    paddingBottom: verticalScale(40),
  },
  card: {
    backgroundColor: '#3498db',
    paddingVertical: verticalScale(14),
    paddingHorizontal: horizontalScale(20),
    borderRadius: 10,
    marginVertical: verticalScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  name: {
    fontSize: scaleFontSize(16) || 16,
    color: '#fff',
    fontWeight: '600',
  },
  amount: {
    fontSize: scaleFontSize(16) || 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Style;

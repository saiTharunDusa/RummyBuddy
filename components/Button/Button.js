import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Style from './Style';
import { scaleFontSize } from '../../assets/Scaling';
import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <View>
        <TouchableOpacity activeOpacity={0.8} style={Style.buttonContainer}>
       <FontAwesomeIcon icon={props.icon} size={scaleFontSize(24)} style={Style.icon}/>
        <Text style={Style.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    </View>
  );
};


Button.propTypes = {
    icon : PropTypes.object.isRequired,
    text : PropTypes.string.isRequired,
}

export default Button;
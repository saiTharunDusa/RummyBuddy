import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Style from './Style';
import PropTypes from "prop-types";
import { scaleFontSize } from '../../assets/Scaling';

const Button = ({ icon, text, onPress }) => {
  return (
    <View>
      <TouchableOpacity 
        activeOpacity={0.8} 
        style={Style.buttonContainer} 
        onPress={onPress}
      >
        <FontAwesomeIcon icon={icon} size={scaleFontSize(24)} style={Style.icon} />
        <Text style={Style.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

Button.propTypes = {
  icon : PropTypes.object.isRequired,
  text : PropTypes.string.isRequired,
  onPress: PropTypes.func,  
};

export default Button;

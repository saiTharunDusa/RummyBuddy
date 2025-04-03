import React from 'react';

import Style from './Style';
import {Pressable, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
const BackButton = props => {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={Style.container}>
      <FontAwesomeIcon icon={faArrowLeft} color='#FFFFFF'/>
    </TouchableOpacity>
  );
};

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default BackButton;
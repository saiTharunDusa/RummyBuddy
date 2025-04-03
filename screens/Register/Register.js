import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { createUser } from '../../api/createUser';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/reducers/user';
import Style from './Style';
const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    try {
      const result = await createUser(fullName, email, password);
      console.log(result);
  
      if (result.error) {
        Alert.alert('Registration Error', result.error);
        return;
      }
  
      const token = await result.user.getIdToken();
  
      dispatch(logIn({
        displayName: fullName,
        email: result.user.email,
        token: token,
      }));
      
    } catch (error) {
      Alert.alert('Unexpected Error', 'Something went wrong during registration.');
    }
  };
  
  return (
    <SafeAreaView style={Style.container}>
      <Text style={Style.title}>Create Account</Text>

      <TextInput
        style={Style.input}
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={Style.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={Style.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={Style.input}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity style={Style.button} onPress={handleRegister}>
        <Text style={Style.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={Style.link}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;

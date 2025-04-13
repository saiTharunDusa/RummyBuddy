import { useState } from "react";
import Style from "./Style";
import { Image, SafeAreaView,View } from "react-native";
import { TouchableOpacity, Text } from "react-native";
import { Alert, TextInput } from "react-native";
import { logInUser } from "../../api/createUser";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/reducers/user";
import { horizontalScale, verticalScale } from "../../assets/Scaling";

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const handleLogin = async () => {
        try{
            const response = await logInUser(email, password);
            if(response.status)
            {
                dispatch(logIn(response.data));
            }
            else{
                Alert.alert(response.error);
            }
        }
        catch(error)
        {
            Alert.alert('Login Error : ');
        }
    }
    return (
        <SafeAreaView style ={Style.container}>
            <View style={{alignItems : 'center'}}>
                <Image
                    source={require("../../assets/rummyCard.jpg")}
                    style={{ width: horizontalScale(80), height: verticalScale(80), marginBottom: verticalScale(10) }}
                    resizeMode="contain"
                />
            </View>
            
            <Text style={Style.title}>Rummy Buddy</Text>
            <TextInput
                style={Style.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={Style.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#aaa"
                secureTextEntry
            />
            <TouchableOpacity style={Style.button} onPress={handleLogin}>
                <Text style={Style.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={Style.link}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Login;
import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import Style from "./Style";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../api/createUser";
import { resetToOriginal } from "../../redux/reducers/user";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { resetAllPlayers } from "../../redux/reducers/allPlayers";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";

const Title = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        await signOutUser();
        dispatch(resetToOriginal());
        navigation.navigate(Routes.Login);
    }
    return(
        <View style={Style.titleContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate(Routes.deleteAccount)} style={Style.deleteButton}>
                <FontAwesomeIcon icon={faTrash} size={16} color="#fff" style={{ marginRight: 6 }} />
                <Text style={Style.logoutText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogout} style={Style.logoutButton}>
                <FontAwesomeIcon icon={faRightFromBracket} size={16} color="#fff" style={{ marginRight: 6 }} />
                <Text style={Style.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <Text style={Style.mainHeading}>
                Rummy Scoreboard
            </Text>
            <Text style={Style.tagLine}>
                Track your game scores with style!
            </Text>
        </View>

      
    )
}

export default Title;
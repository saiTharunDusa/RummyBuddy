import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import Style from "./Style";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../api/createUser";
import { resetToOriginal } from "../../redux/reducers/user";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { resetAllPlayers } from "../../redux/reducers/allPlayers";

const Title = () => {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        await signOutUser();
        dispatch(resetToOriginal());
        dispatch(resetAllPlayers());
    }
    return(
        <View style={Style.titleContainer}>
            <TouchableOpacity onPress={handleLogout} style={Style.logoutButton}>
                <FontAwesomeIcon icon={faRightFromBracket} size={16} color="#fff" style={{ marginRight: 6 }} />
                <Text style={Style.logoutText}>Logout</Text>
            </TouchableOpacity>
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
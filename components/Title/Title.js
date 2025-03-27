import React from "react";
import { View, Text} from "react-native";
import Style from "./Style";

const Title = () => {
    return(
        <View style={Style.titleContainer}>
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
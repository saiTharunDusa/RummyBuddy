import React from "react";
;
import { faPersonCirclePlus, faPlus, faPlay } from '@fortawesome/free-solid-svg-icons';
import { View } from "react-native";
import Button from "../../components/Button/Button";

const Home = ()=>{
    return (
        <View>
            <Button icon={faPersonCirclePlus} text ={"Add Players"} />
            <Button icon={faPlus} text={"Start Game"} /> 
            <Button icon={faPlay} text={"Continue Game"} />
        </View>
    )
}

export default Home;
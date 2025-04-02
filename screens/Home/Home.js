import React from "react";
import { faPersonCirclePlus, faPlus, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Text, View } from "react-native";
import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import { SafeAreaView } from "react-native-safe-area-context";
import { Routes } from "../../navigation/Routes";
import globalStyle from "../../assets/styles/globalStyle";
import { ScrollView } from "react-native";
import { Pressable } from "react-native";


const Home = ({navigation})=>{
    return (
        <SafeAreaView>
            <ScrollView>
                    <Title/>
                    <Button
                        icon={faPersonCirclePlus}
                        text="Add Players"
                        onPress={() => {
                            navigation.navigate(Routes.AllPlayers);
                        }}
                    />
                    <Button icon={faPlus} text={"Start Game"} /> 
                    <Button icon={faPlay} text={"Continue Game"} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;
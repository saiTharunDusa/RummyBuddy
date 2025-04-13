import React from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import Style from "./Style";
import GameBoardTitle from "../../config/GameBoardTitle/GameBoardTitle";
import PlayersRow from "../../config/PlayersRow/PlayersRow";
import Rounds from "../../config/Rounds/Rounds";
import ScoreModal from "../../Modals/ScoreModal/ScoreModal";
import MappingModal from "../../Modals/MappingModal/MappingModal";
import GameSettingModal from "../../Modals/GameSettingsModal/GameSettingsModal";
import EditModal from "../../Modals/EditModal/EditModal";
import ReEntryModal from "../../Modals/ReEntryModal/ReEntryModal";

const GameBoard = () => {
    
    return (
        <SafeAreaView style={{flex : 1}}>

            {/** Title Row */}
            <GameBoardTitle/>

            {/** Players Each Round Row */}
            <PlayersRow/>

            
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={Style.scrollContent}>
                {/** Each Round and Totals */}
                <Rounds/>
            </ScrollView>

            {/** Modals */}
            <View style={Style.fabRow}>
                <ScoreModal/>
                <MappingModal/>
                <GameSettingModal/>
                <EditModal/>
                <ReEntryModal/>
            </View>

        </SafeAreaView>
    )
}

export default GameBoard;
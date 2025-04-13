import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Style from "./Style";
import GameBoardTitle from "../../config/GameBoardTitle/GameBoardTitle";
import PlayersRow from "../../config/PlayersRow/PlayersRow";
import Rounds from "../../config/Rounds/Rounds";
import ScoreModal from "../../Modals/ScoreModal/ScoreModal";
import MappingModal from "../../Modals/MappingModal/MappingModal";
import GameSettingModal from "../../Modals/GameSettingsModal/GameSettingsModal";
import EditModal from "../../Modals/EditModal/EditModal";
import ReEntryModal from "../../Modals/ReEntryModal/ReEntryModal";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";

const GameBoard = () => {
    const navigation = useNavigation();
    const gameState = useSelector((store) => store.gameState);
    const gameId = useSelector((store) => store.gameState.gameId);
    const userId = auth().currentUser?.uid;

    const saveGameData = async () => {
      try {
        const roundsRef = firestore()
          .collection("users")
          .doc(userId)
          .collection("games")
          .doc(gameId)
          .collection("rounds");

        const batch = firestore().batch();

        gameState.rounds.forEach((round, index) => {
          const docRef = roundsRef.doc(index.toString());
          batch.set(docRef, {
            ...round,
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
          });
        });

        await batch.commit();

        await firestore()
          .collection("users")
          .doc(userId)
          .collection("games")
          .doc(gameId)
          .update({
            ...gameState,
            updatedAt: firestore.FieldValue.serverTimestamp(),
          });

      } catch (err) {
        console.log("ERROR saving game data:", err);
      }
    };

    useEffect(() => {
      const unsubscribe = navigation.addListener('beforeRemove', async (e) => {
        e.preventDefault();

        await saveGameData();
        
        navigation.dispatch(e.data.action);
      });

      return unsubscribe;
    }, [navigation, saveGameData]);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* Title Row */}
        <GameBoardTitle />

        {/* Players Each Round Row */}
        <PlayersRow />

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={Style.scrollContent}
        >
          {/* Each Round and Totals */}
          <Rounds />
        </ScrollView>

        {/* Modals */}
        <View style={Style.fabRow}>
          <MappingModal />
          <GameSettingModal />
          <ReEntryModal />
          <EditModal />
          <ScoreModal />
        </View>
      </SafeAreaView>
    );
};

export default GameBoard;

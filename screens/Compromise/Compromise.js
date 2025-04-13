import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { SafeAreaView, Text, View, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Style from "./Style";
import BackButton from "../../components/BackButton/BackButton";

const Compromise = () => {
  const currentGame = useSelector((store) => store.gameState);

  const navigation = useNavigation();
  let totalGameAmount = Number(currentGame.totalGameAmount);
  const totalGameAmountFixed = Number(currentGame.totalGameAmountFixed);
  const totalScore = currentGame.totalScore || {};
  const players = currentGame.players || [];
  const dropValue = Number(currentGame.drop); 
  const totalGameScore = currentGame.totalGameScore || 0;

  const validPlayers = players.filter(p => totalScore[p.id] < totalGameScore);
  const outPlayers = players.filter(p => totalScore[p.id] >= totalGameScore);
  const eligibleProfitPlayers = players.filter(p => totalScore[p.id] < (totalGameScore - dropValue));
  const singlePlayerAmount = totalGameAmountFixed / players.length;

  const playerReturns = {};

  outPlayers.forEach(p => {
    playerReturns[p.id] = 0;
  });

  const playerDropMap = {};


  validPlayers.forEach(player=>{
    playerReturns[player.id] = singlePlayerAmount;
    totalGameAmount = totalGameAmount - singlePlayerAmount;
    playerDropMap[player.id] = 0;
  })

  let totalDrops = 0;
  eligibleProfitPlayers.forEach(player => {
    const noOfDrops = Math.floor((totalGameScore - totalScore[player.id] - 1) / dropValue);
    playerDropMap[player.id] += noOfDrops;
    totalDrops += noOfDrops;
  });


  eligibleProfitPlayers.forEach(p => {
    const drops = playerDropMap[p.id];
    playerReturns[p.id] += Math.floor((drops / totalDrops) * totalGameAmount);
  });

  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.back} >
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={Style.title}>💸 Compromise Results</Text>
      </View>
      
      <Text style={
        {
            fontSize: 15,
      fontWeight: 'bold',
      color: '#3498db',
      textAlign: 'center',
      marginBottom: 16,
        }
      }>Compromise is never an option — unless cash is involved 😉</Text>
      <Text style={
        {
            fontSize: 15,
      fontWeight: 'bold',
      color: '#3498db',
      textAlign: 'center',
      marginBottom: 16,
        }
      }>No mercy. No refunds. Just math.
And yes — your drops were counted.</Text>
      <ScrollView contentContainerStyle={Style.scroll} showsVerticalScrollIndicator={false}>
        {players.map((player, index) => (
          <View key={player.id} style={Style.card}>
            <Text style={Style.name}>
              {index + 1}. {player.name}
            </Text>
            <Text style={Style.amount}>₹ {playerReturns[player.id] ?? 0}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};


export default Compromise;

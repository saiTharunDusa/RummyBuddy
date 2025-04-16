import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { SafeAreaView, Text, View, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Style from "./Style";
import BackButton from "../../components/BackButton/BackButton";

const Compromise = () => {
  const currentGame = useSelector((store) => store.gameState);
  const navigation = useNavigation();

  // Extract and parse numbers
  const totalGameAmount = Number(currentGame.totalGameAmount) || 0;
  const totalGameAmountFixed = Number(currentGame.totalGameAmountFixed) || 0;
  const totalScore = currentGame.totalScore || {};
  const players = currentGame.players || [];
  const dropValue = Number(currentGame.drop) || 1;
  const totalGameScore = Number(currentGame.totalGameScore) || 0;

  // Filter players
  const validPlayers = players.filter(p => totalScore[p.id] < totalGameScore);
  const outPlayers = players.filter(p => totalScore[p.id] >= totalGameScore);
  const eligibleProfitPlayers = players.filter(p => totalScore[p.id] < (totalGameScore - dropValue));

  // Base amount per player
  const singlePlayerAmount = totalGameAmountFixed / players.length;

  // Result map
  const playerReturns = {};

  // Out players get nothing
  outPlayers.forEach(p => {
    playerReturns[p.id] = 0;
  });

  // Build drop map
  const playerDropMap = {};
  let totalDrops = 0;

  validPlayers.forEach(player => {
    const score = totalScore[player.id] || 0;
    const noOfDrops = Math.floor((totalGameScore - score - 1) / dropValue);
    const drops = noOfDrops + 1;

    playerDropMap[player.id] = drops;
    totalDrops += drops;
  });

  // Profit distribution (initialize first to avoid NaN)
  validPlayers.forEach(player => {
    if (!playerReturns[player.id]) playerReturns[player.id] = 0;

    const share = (playerDropMap[player.id] / totalDrops) * totalGameAmount;
    playerReturns[player.id] += Number(share.toFixed(2)); // optional rounding
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
      }>Compromise is never an option — unless cash points are involved 😉</Text>
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
            <Text style={Style.amount}> {playerReturns[player.id] ?? 0}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};


export default Compromise;

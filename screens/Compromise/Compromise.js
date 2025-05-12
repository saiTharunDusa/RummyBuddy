// screens/Compromise.js
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Style from "./Style";
import BackButton from "../../components/BackButton/BackButton";

const Compromise = () => {
  const currentGame = useSelector((store) => store.gameState);
  const navigation = useNavigation();

  // parse data (unchanged)…
  const totalGameAmount = Number(currentGame.totalGameAmount) || 0;
  const totalScore = currentGame.totalScore || {};
  const players = currentGame.players || [];
  const dropValue = Number(currentGame.drop) || 1;
  const totalGameScore = Number(currentGame.totalGameScore) || 0;

  // determine returns (unchanged)…
  const validPlayers = players.filter(p => totalScore[p.id] < totalGameScore);
  const outPlayers = players.filter(p => totalScore[p.id] >= totalGameScore);
  const playerReturns = {};

  outPlayers.forEach(p => {
    playerReturns[p.id] = 0;
  });
  let totalDrops = 0;
  validPlayers.forEach(player => {
    const score = totalScore[player.id] || 0;
    const drops = Math.floor((totalGameScore - score - 1) / dropValue) + 1;
    playerReturns[player.id] = 0; // init
    totalDrops += drops;
    playerReturns[player.id] = drops;
  });
  validPlayers.forEach(player => {
    const share = (playerReturns[player.id] / totalDrops) * totalGameAmount;
    playerReturns[player.id] = Number(share.toFixed(2));
  });

  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.back}>
  <BackButton onPress={() => navigation.goBack()} />
  <Text style={Style.title}>💸 Compromise Results</Text>
  <View style={{ width: 32 }} /> {/* placeholder to balance BackButton width */}
</View>


      {/* Use subtitle style for consistent blue text */}
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
  <Text style={Style.subtitle}>
    Compromise is never an option — unless cash points are involved 😉
  </Text>
  <Text style={Style.subtitle}>
    No mercy. No refunds. Just math.{"\n"}
    And yes — your drops were counted.
  </Text>
</View>


      <ScrollView contentContainerStyle={Style.scroll} showsVerticalScrollIndicator={false}>
        {players.map((player, index) => (
          <View key={player.id} style={Style.card}>
            <Text style={Style.name}>
              {index + 1}. {player.name}
            </Text>
            <Text style={Style.amount}>
              {playerReturns[player.id] ?? 0}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Compromise;

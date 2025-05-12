import React, { useState } from "react";
import { TouchableOpacity, SafeAreaView, Text, View, TextInput, Alert } from "react-native";
import Style from "./Style";
import BackButton from "../../components/BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import { initializeGame } from "../../redux/reducers/gameState";
import firestore from "@react-native-firebase/firestore";
import { resetAllSelectedPlayers } from "../../redux/reducers/selectedPlayers";

const StartGame = ({ navigation }) => {
  const [totalGameScore, setTotalGameScore] = useState("100");
  const [dropScore, setDropScore] = useState("25");
  const [middleDropScore, setMiddleDropScore] = useState("40");
  const [fullCountScore, setFullCountScore] = useState("80");
  const [perPlayerAmount, setPerPlayerAmount] = useState("");

  const selectedPlayersList = useSelector((store) => store.selectedPlayers.list);
  const dispatch = useDispatch();

  const handleBtn = async () => {
    try {
      if (
        parseInt(totalGameScore) <= 0 ||
        parseInt(dropScore) <= 0 ||
        parseInt(middleDropScore) <= 0 ||
        parseInt(fullCountScore) <= 0 ||
        (parseInt(perPlayerAmount) || 0) <= 0
      ) {
        return Alert.alert("Please check the game scores and total amount!");
      } else if (selectedPlayersList.length <= 1) {
        return Alert.alert("Please select at least 2 players!");
      }

      const userId = auth().currentUser?.uid;
      const gameRef = await firestore()
        .collection("users")
        .doc(userId)
        .collection("games")
        .add({
          drop: dropScore,
          middleDrop: middleDropScore,
          fullCount: fullCountScore,
          totalGameScore: totalGameScore,
          totalGameAmountFixed: (parseInt(perPlayerAmount) || 0) * selectedPlayersList.length,
          totalGameAmount: (parseInt(perPlayerAmount) || 0) * selectedPlayersList.length,
          players: selectedPlayersList,
          status: "continue",
          totalScore: [],
          inGameOutPlayers: [],
          inGameDangerPlayers: [],
          reEntryRounds: [],
          dealerId: selectedPlayersList.length - 1,
          previousDealerId: -1,
          playersLifeCycle: [],
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      dispatch(initializeGame({
        gameId: gameRef.id,
        status: "continue",
        drop: Number(dropScore),
        middleDrop: Number(middleDropScore),
        fullCount: Number(fullCountScore),
        totalGameScore: Number(totalGameScore),
        totalGameAmountFixed: (parseInt(perPlayerAmount) || 0) * selectedPlayersList.length,
        totalGameAmount: (parseInt(perPlayerAmount) || 0) * selectedPlayersList.length,
        players: selectedPlayersList,
        rounds: [],
        totalScore: [],
        inGameOutPlayers: [],
        inGameDangerPlayers: [],
        reEntryRounds: [],
        dealerId: selectedPlayersList.length - 1,
        previousDealerId: -1,
        playersLifeCycle: [],
      }));

      dispatch(resetAllSelectedPlayers());
      navigation.navigate("GameBoard");
    } catch (error) {
      console.log("Error starting game:", error);
    }
  };

  return (
    <SafeAreaView style={Style.container}>
      {/* Top Title Container */}
      <View style={Style.topContainer}>
        <View style={Style.back}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <Text
        style={Style.text1}>Add Players to the game!</Text>
      </View>

      {/* Add Players Container */}
      <View>
  <TouchableOpacity onPress={() => navigation.navigate("selectPlayers")}>
    <Text style={Style.addPlayersButton}>Add Players</Text>
  </TouchableOpacity>
</View>

      {/* Game Score Container */}
      <Text
      style={Style.text1}>Game Scores</Text>
      <View style={Style.groupContainer}>
        <View style={Style.row}>
          <Text 
          style={Style.label}>Total</Text>
          <TextInput
            keyboardType="numeric"
            value={totalGameScore}
            onChangeText={setTotalGameScore}
            style={Style.textInput}
          />
        </View>
        <View style={Style.row}>
          <Text
          style={Style.label}>Drop</Text>
          <TextInput
            keyboardType="numeric"
            value={dropScore}
            onChangeText={setDropScore}
            style={Style.textInput}
          />
        </View>
        <View style={Style.row}>
          <Text
          style={Style.label}>Middle Drop</Text>
          <TextInput
            keyboardType="numeric"
            value={middleDropScore}
            onChangeText={setMiddleDropScore}
            style={Style.textInput}
          />
        </View>
        <View style={Style.row}>
          <Text
          style={Style.label}>Full Count</Text>
          <TextInput
            keyboardType="numeric"
            value={fullCountScore}
            onChangeText={setFullCountScore}
            style={Style.textInput}
          />
        </View>
      </View>

      {/* Total Game Points Container */}
      <Text 
      style={Style.text1}>Game Cash Points Per Player</Text>
      <View style={Style.totalGameAmountContainer}>
        <TextInput
          keyboardType="numeric"
          value={perPlayerAmount}
          onChangeText={setPerPlayerAmount}
          style={Style.gameAmountText}
        />
      </View>

      {/* Start Game Container */}
      <View>
  <TouchableOpacity style={Style.startGameButton} onPress={handleBtn}>
    <Text style={Style.startGameButtonText}>Start Game</Text>
  </TouchableOpacity>
</View>
    </SafeAreaView>
  );
};

export default StartGame;

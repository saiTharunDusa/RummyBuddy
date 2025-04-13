import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Modal,
  View,
  Text,
  TextInput,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Style from "./Style";
import {
  setRounds,
  addTotals,
  setOutPlayers,
  setDangerPlayers,
  setDealerId,
  setPlayersLifeCycle,
  setStatus,
} from "../../redux/reducers/gameState";
import { scaleFontSize } from "../../assets/Scaling";
import { useNavigation } from "@react-navigation/native";

const EditModal = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const currentGame = useSelector((store) => store.gameState);
  const inGamePlayers = useSelector((store) => store.gameState.players || []);
  const totalGameScore = useSelector((store) => store.gameState.totalGameScore);
  const dropScore = useSelector((store) => store.gameState.drop);
  const dealerId = useSelector((store) => store.gameState.dealerId || 0);
  const previousDealerId = useSelector((store) => store.gameState.previousDealerId || 0);
  const playersLifeCycle = useSelector((store) => store.gameState.playersLifeCycle);
  const rounds = useSelector((store) => store.gameState.rounds || [])
  

  const [showEditModal, setShowEditModal] = useState(false);
  const [lastRoundScores, setLastRoundScores] = useState({});

  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [showWinnerName, setShowWinnerName] = useState();


  const handleEditLastRound = () => {

    const updatedRounds = [...currentGame.rounds];
    const prevLastRound = updatedRounds[updatedRounds.length - 1] || {};
    updatedRounds[updatedRounds.length - 1] = lastRoundScores;

    const newTotals = { ...currentGame.totalScore };
    inGamePlayers.forEach((p) => {
      const oldScore = Number(prevLastRound[p.id] || 0);
      const newScore = Number(lastRoundScores[p.id] || 0);
      newTotals[p.id] = (Number(newTotals[p.id]) || 0) - oldScore + newScore;
    });

    dispatch(setRounds(updatedRounds));
    dispatch(addTotals(newTotals));

    const outPlayersAfter = inGamePlayers.filter(
      (p) => newTotals[p.id] >= totalGameScore
    );
    const dangerPlayers = inGamePlayers.filter((p) => {
      const s = newTotals[p.id];
      return s >= totalGameScore - dropScore && s < totalGameScore;
    });

    dispatch(setOutPlayers(outPlayersAfter));
    dispatch(setDangerPlayers(dangerPlayers));


    const newPlayersLifeCycle = [...playersLifeCycle];
    let newDealerId = dealerId; 

    // check for players who were out but are now in because of editing.
    for (let i = 0; i < inGamePlayers.length; i++) {
      if (newPlayersLifeCycle[i] === rounds.length && 
          newTotals[inGamePlayers[i].id] < totalGameScore) {

        const prevPlayerIdx = (i === 0) ? inGamePlayers.length - 1 : i - 1;
        console.log(prevPlayerIdx);
        if (prevPlayerIdx === previousDealerId) {
          newDealerId = i;
        }
        
        newPlayersLifeCycle[i] = 0;
      }
    }
    
    // check for players who were in but are now out because of editing.
    for (let i = 0; i < inGamePlayers.length; i++) {
      if (newPlayersLifeCycle[i] === 0 && 
          newTotals[inGamePlayers[i].id] >= totalGameScore) {
        
        const prevPlayerIdx = (i === 0) ? inGamePlayers.length - 1 : i - 1;
        
        if (prevPlayerIdx === previousDealerId) {
          newDealerId = previousDealerId;
        }
        
        newPlayersLifeCycle[i] = rounds.length;
      }
    }

    dispatch(setPlayersLifeCycle(newPlayersLifeCycle));
    dispatch(setDealerId(newDealerId));

    const alivePlayers = inGamePlayers.filter((p) => newTotals[p.id] < totalGameScore);
    if(alivePlayers.length === 1)
    {
      dispatch(setStatus('completed'));
      setShowWinnerModal(true);
      setShowWinnerName(alivePlayers[0].name);
    }
    else
    {
      dispatch(setStatus('continue'));
      setShowWinnerModal(false);
    }
    
        

    setShowEditModal(false);
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={Style.fab}
        onPress={() => {
          const lastRound = currentGame.rounds?.[currentGame.rounds.length - 1] || {};
          setLastRoundScores({ ...lastRound });
          setShowEditModal(true);
        }}
      >
        <FontAwesomeIcon icon={faPen} size={20} color="#fff" />
      </TouchableOpacity>

      <Modal visible={showEditModal} transparent animationType="fade">
        <View style={Style.modalBackground}>
          <View style={Style.modalBox}>
            <Text style={Style.modalTitle}>Edit Last Round</Text>
            {inGamePlayers.map((p, index) => (
              <View key={p.id} style={Style.scoreInputRow}>
                <Text style={Style.playerLabel}>{index + 1 + "."}</Text>
                <Text style={Style.playerName}>{p.name}</Text>
                <TextInput
                  style={Style.input}
                  keyboardType="numeric"
                  value={lastRoundScores[p.id]?.toString() || ""}
                  onChangeText={(val) =>
                    setLastRoundScores((prev) => ({
                      ...prev,
                      [p.id]: val.replace(/[^0-9]/g, ""),
                    }))
                  }
                />
              </View>
            ))}
            <TouchableOpacity
              style={Style.modalClose}
              onPress={handleEditLastRound}
            >
              <Text style={{ color: "#fff", fontSize : scaleFontSize(20) }}>Edit Round</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Style.modalClose}
              onPress={() => setShowEditModal(false)}
            >
              <Text style={{ color: "#fff", fontSize : scaleFontSize(20) }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showWinnerModal} transparent animationType="fade">
                <View style={Style.modalBackground}>
                    <View style={Style.modalBox}>
                    <Text style={Style.modalTitle}>🎉 Congratulations!</Text>
                    <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 10 }}>
                        {showWinnerName} is the winner!
                    </Text>
                    <TouchableOpacity style={Style.modalClose} onPress={() =>
                    {
                        navigation.navigate(Routes.Compromise),
                        setShowWinnerModal(false)
                    } }>
                    <Text style={{ color: '#fff' }}>Amount Won</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.modalClose} onPress={() => setShowWinnerModal(false)}>
                        <Text style={{ color: '#fff' }}>Close</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </Modal>

    </SafeAreaView>
  );
};

export default EditModal;

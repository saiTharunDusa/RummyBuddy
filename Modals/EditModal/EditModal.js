import React, { useState } from "react";
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
  setOffSet,
} from "../../redux/reducers/gameState";

const EditModal = () => {
  const dispatch = useDispatch();
  const currentGame = useSelector((store) => store.gameState);
  const inGamePlayers = useSelector((store) => store.gameState.players || []);
  const totalGameScore = useSelector((store) => store.gameState.totalGameScore);
  const dropScore = useSelector((store) => store.gameState.drop);
  const dealerId = useSelector((store) => store.gameState.dealerId || 0);
  const offSet = useSelector((store) => store.gameState.offSet || []);

  const [showEditModal, setShowEditModal] = useState(false);
  const [lastRoundScores, setLastRoundScores] = useState({});

  const handleEditLastRound = () => {
    const outPlayersBefore = currentGame.inGameOutPlayers || [];
    const outIdsBefore = new Set(outPlayersBefore.map((p) => p.id));

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

    const outIdsAfter = new Set(outPlayersAfter.map((p) => p.id));

   
    const cameBackIn = [...outIdsBefore].filter(
      (id) => !outIdsAfter.has(id)
    );
    const somebodyCameBack = cameBackIn.length > 0;

    
    if (somebodyCameBack) {
      const newOffSet = [...offSet];
      newOffSet[dealerId] = 1;

      const offsetValue = newOffSet[dealerId]; 
      const nextDealerId = (dealerId + offsetValue) % inGamePlayers.length;

      if (outIdsAfter.has(inGamePlayers[nextDealerId].id)) {
        newOffSet[dealerId] = offsetValue + 1;
        dispatch(setOffSet(newOffSet));
        dispatch(setDealerId(dealerId));
      } else {
        dispatch(setOffSet(newOffSet));
        dispatch(setDealerId(dealerId));
      }
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
                <Text style={Style.playerLabel}>{index + 1}</Text>
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
              <Text style={{ color: "#fff" }}>Edit Round</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Style.modalClose}
              onPress={() => setShowEditModal(false)}
            >
              <Text style={{ color: "#fff" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EditModal;

import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, Modal, View, Text, TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Style from "./Style";
import { setRounds, addTotals, setOutPlayers, setDangerPlayers } from "../../redux/reducers/gameState";

const EditModal = () => {
  const dispatch = useDispatch();
  const currentGame = useSelector((store) => store.gameState);
  const inGamePlayers = useSelector((store) => store.gameState.players || []);
  const totalGameScore = useSelector((store) => store.gameState.totalGameScore);
  const dropScore = useSelector((store) => store.gameState.drop);
 

  const [showEditModal, setShowEditModal] = useState(false);
  const [lastRoundScores, setLastRoundScores] = useState({});

  const handleEditLastRound = () => {
    const updatedRounds = [...currentGame.rounds];
    const prevLastRound = updatedRounds[updatedRounds.length - 1];
    updatedRounds[updatedRounds.length - 1] = lastRoundScores;

    const totals = { ...currentGame.totalScore };
    inGamePlayers.forEach((p) => {
      const prev = Number(prevLastRound[p.id] || 0);
      const updated = Number(lastRoundScores[p.id] || 0);
      totals[p.id] = Number(totals[p.id] || 0) - prev + updated;
    });
    dispatch(setRounds(updatedRounds));
    dispatch(addTotals(totals));

    const outPlayers = inGamePlayers.filter((p) => totals[p.id] >= totalGameScore);
    
    const dangerPlayers = inGamePlayers.filter((p) => {
      const score = totals[p.id];
      const lower = totalGameScore - dropScore;
      const isDanger = score >= lower && score < totalGameScore;
      return isDanger;
    });
   
    dispatch(setOutPlayers(outPlayers));
    dispatch(setDangerPlayers(dangerPlayers));

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
            <TouchableOpacity style={Style.modalClose} onPress={handleEditLastRound}>
              <Text style={{ color: "#fff" }}>Edit Round</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.modalClose} onPress={() => setShowEditModal(false)}>
              <Text style={{ color: "#fff" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EditModal;

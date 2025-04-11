import React, { useMemo, useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, Modal } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Style from "./Style";
import { useDispatch, useSelector } from "react-redux";
import { addRounds, addTotals, setDangerPlayers, setOutPlayers } from "../../redux/reducers/gameState";

const ScoreModal = () => {
  const dispatch = useDispatch();

  const inGamePlayers = useSelector((store) => store.gameState.players || []);
  const totalScore = useSelector((store) => store.gameState.totalScore || {});
  const totalGameScore = useSelector((store) => store.gameState.totalGameScore || 0);
  const dropScore = useSelector((store) => store.gameState.drop || 0);
  const inGameOutPlayers = useSelector((store) => store.gameState.inGameOutPlayers || []);

  const [showScoreModal, setShowScoreModal] = useState(false);
  const [currentScores, setCurrentScores] = useState({});

  const activePlayers = useMemo(() => {
    return inGamePlayers.filter((p) => (totalScore[p.id] || 0) < totalGameScore);
  }, [inGamePlayers, totalScore, totalGameScore]);

  const hasOutPlayersIds = useMemo(() => {
    return new Set(inGameOutPlayers.map((p) => p.id));
  }, [inGameOutPlayers]);
  

  const handleAddRound = () => {
    const newRound = {};
    const totals = { ...totalScore }; 
  
    activePlayers.forEach((p) => {
      const score = Number(currentScores[p.id]) || 0;
      newRound[p.id] = score;
      totals[p.id] = (totals[p.id] || 0) + score;
    });
  
    dispatch(addRounds(newRound));
    dispatch(addTotals(totals));
  
    const outPlayers = inGamePlayers.filter((p) => totals[p.id] >= totalGameScore);
  
    const dangerPlayers = activePlayers.filter((p) => {
      const score = totals[p.id];
      const lower = totalGameScore - dropScore;
      return score >= lower && score < totalGameScore;
    });
  
    dispatch(setOutPlayers(outPlayers));
    dispatch(setDangerPlayers(dangerPlayers));
  
    setShowScoreModal(false);
    setCurrentScores({});
  };
  

  const handleCancel = () => {
    setShowScoreModal(false);
    setCurrentScores({});
  };

  return (
    <SafeAreaView>
      <TouchableOpacity style={Style.fab} onPress={() => setShowScoreModal(true)}>
        <FontAwesomeIcon icon={faPlus} size={20} color="#fff" />
      </TouchableOpacity>

      <Modal visible={showScoreModal} transparent animationType="fade">
        <View style={Style.modalBackground}>
          <View style={Style.modalBox}>
            <Text style={Style.modalTitle}>Enter Scores</Text>

            {inGamePlayers.map((p, index) => {
                if (hasOutPlayersIds.has(p.id)) return null;
                return (
                  <View key={p.id} style={Style.scoreInputRow}>
                    <Text style={Style.playerLabel}>{index + 1}</Text>
                    <Text style={Style.playerName}>{p.name}</Text>
                    <TextInput
                      style={Style.input}
                      keyboardType="numeric"
                      value={currentScores[p.id]?.toString() || ""}
                      onChangeText={(val) =>
                        setCurrentScores((prev) => ({ ...prev, [p.id]: val }))
                      }
                    />
                  </View>
                );
            })}


            <TouchableOpacity style={Style.modalClose} onPress={handleAddRound}>
              <Text style={{ color: "#fff" }}>Add Round</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Style.modalClose} onPress={handleCancel}>
              <Text style={{ color: "#fff" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ScoreModal;

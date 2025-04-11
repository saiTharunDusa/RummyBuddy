import React, { useMemo, useState } from "react";
import { SafeAreaView, TouchableOpacity, Text, Modal, View } from "react-native";
import Style from "./Style";
import { useDispatch, useSelector } from "react-redux";
import {
  addRounds,
  addTotals,
  resetGameBoard,
  setDangerPlayers,
  setOutPlayers,
  setReEntryRounds,
} from "../../redux/reducers/gameState";

const ReEntryModal = () => {
  const dispatch = useDispatch();

  const inGamePlayers = useSelector((store) => store.gameState.players || []);
  const inGamePlayersOut = useSelector((store) => store.gameState.inGameOutPlayers || []);
  const inGamePlayersDanger = useSelector((store) => store.gameState.inGameDangerPlayers || []);
  const totalScore = useSelector((store) => store.gameState.totalScore || {});
  const totalGameScore = useSelector((store) => store.gameState.totalGameScore || 0);
  const dropScore = useSelector((store) => store.gameState.dropScore || 0);
  const rounds = useSelector((store) => store.gameState.rounds);

  const [showReentryModal, setShowReentryModal] = useState(false);
  const [reEntryScores, setReEntryScores] = useState([]);

  const outPlayerIds = useMemo(() => new Set(inGamePlayersOut.map((p) => p.id)), [inGamePlayersOut]);

  const dangerPlayerIds = useMemo(() => new Set(inGamePlayersDanger.map((p) => p.id)), [inGamePlayersDanger]);
  
  console.log(dangerPlayerIds);

  const handleReentry = () => {
    const newRound = {};
    const totals = {...totalScore};
    let reEnteredPlayerIds = [];

    inGamePlayers.forEach((p) => {
      if(outPlayerIds.has(p.id))
      {
        newRound[p.id] = totalScore[p.id] || 0;
      }
    })

    inGamePlayers.forEach((p) => {
      if (outPlayerIds.has(p.id) && reEntryScores[p.id] !== undefined) {
        reEnteredPlayerIds.push(p.id);
      }
    });
    
    

    const validPlayers = inGamePlayers.filter((p) => !outPlayerIds.has(p.id));

    let maxScore = 0;
    validPlayers.forEach((p) => {
      const score = totalScore[p.id] || 0;
      newRound[p.id] = score;
      maxScore = Math.max(maxScore, score);
    });

    reEnteredPlayerIds.forEach((id) => {
      newRound[id] = maxScore + 1;
      totals[id] = newRound[id]; 
    });
    

    dispatch(addRounds(newRound));
    dispatch(addTotals(totals));

    const outPlayers = inGamePlayers.filter((p) => newRound[p.id] >= totalGameScore);
    const dangerPlayers = inGamePlayers.filter((p) => {
      const score = newRound[p.id];
      const lower = totalGameScore - dropScore;
      const isDanger = score >= lower && score < totalGameScore;
      return isDanger;
    });
    dispatch(setOutPlayers(outPlayers));
    dispatch(setDangerPlayers(dangerPlayers));

    dispatch(setReEntryRounds({
      roundIndex: rounds.length, 
      players: reEnteredPlayerIds, 
    }));
    

    setShowReentryModal(false);
  };

  const handleCancel = () => {
	setShowReentryModal(false);
  }

  return (
    <SafeAreaView>
      <TouchableOpacity style={Style.fab} onPress={() => setShowReentryModal(true)}>
        <Text style={{ color: "#fff", fontSize: 19, fontWeight: "bold" }}>R</Text>
      </TouchableOpacity>

      <Modal visible={showReentryModal} transparent animationType="fade">
        <View style={Style.modalBackground}>
          <View style={Style.modalBox}>
            <Text style={Style.modalTitle}>Re Entry</Text>

            {inGamePlayersOut.map((p, index) => {
              const isSelected = reEntryScores[p.id] !== undefined;
              return (
                <TouchableOpacity
                  key={p.id}
                  style={Style.checkboxRow}
                  onPress={() => {
                    setReEntryScores((prev) => {
                      const updated = { ...prev };
                      if (isSelected) delete updated[p.id];
                      else updated[p.id] = 0;
                      return updated;
                    });
                  }}
                >
                  <View style={[Style.checkbox, { backgroundColor: isSelected ? "#3498db" : "#fff" }]}>
                    {isSelected && <Text style={Style.checkboxTick}>✓</Text>}
                  </View>
                  <Text style={Style.checkboxLabel}>{index + 1}. {p.name}</Text>
                </TouchableOpacity>
              );
            })}

            {inGamePlayersOut.length > 0 && dangerPlayerIds.size === 0 ? (
              <View>
                <TouchableOpacity style={Style.modalClose} onPress={handleReentry}>
                  <Text style={{ color: "#fff" }}>Re-entry</Text>
                </TouchableOpacity>
				  <TouchableOpacity style={Style.modalClose} onPress={handleCancel}>
                  <Text style={{ color: "#fff" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity style={Style.modalClose} onPress={() => setShowReentryModal(false)}>
                  <Text style={{ color: "#fff" }}>No Re-entry Available!</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ReEntryModal;

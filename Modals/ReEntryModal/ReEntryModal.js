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
  setDealerId,
  setOffSet,
} from "../../redux/reducers/gameState";

const ReEntryModal = () => {
  const dispatch = useDispatch();

  const inGamePlayers = useSelector((store) => store.gameState.players || []);
  const inGamePlayersOut = useSelector((store) => store.gameState.inGameOutPlayers || []);
  const inGamePlayersDanger = useSelector((store) => store.gameState.inGameDangerPlayers || []);
  const totalScore = useSelector((store) => store.gameState.totalScore || {});
  const totalGameScore = useSelector((store) => store.gameState.totalGameScore || 0);
  const dropScore = useSelector((store) => store.gameState.dropScore || 0);
  const rounds = useSelector((store) => store.gameState.rounds || []);
  
  const dealerId = useSelector((store) => store.gameState.dealerId);
  const offSet = useSelector((store) => store.gameState.offSet || []);

  const [showReentryModal, setShowReentryModal] = useState(false);
  const [reEntryScores, setReEntryScores] = useState([]);

  const outPlayerIds = useMemo(
    () => new Set(inGamePlayersOut.map((p) => p.id)),
    [inGamePlayersOut]
  );
  const dangerPlayerIds = useMemo(
    () => new Set(inGamePlayersDanger.map((p) => p.id)),
    [inGamePlayersDanger]
  );

  const handleReentry = () => {
    const outPlayersBefore = [...inGamePlayersOut];
    const outIdsBefore = new Set(outPlayersBefore.map((p) => p.id));

    const newRound = {};
    const totals = { ...totalScore };

   
    inGamePlayers.forEach((p) => {
      if (outPlayerIds.has(p.id)) {
        newRound[p.id] = totalScore[p.id] || 0;
      }
    });

    let reEnteredPlayerIds = [];
    inGamePlayers.forEach((p) => {
      if (outPlayerIds.has(p.id) && reEntryScores[p.id] !== undefined) {
        reEnteredPlayerIds.push(p.id);
      }
    });

    let maxScore = 0;
    const validPlayers = inGamePlayers.filter((p) => !outPlayerIds.has(p.id));
    validPlayers.forEach((p) => {
      const score = totals[p.id] || 0;
      newRound[p.id] = score;
      maxScore = Math.max(maxScore, score);
    });

  
    reEnteredPlayerIds.forEach((id) => {
      newRound[id] = maxScore + 1;
      totals[id] = maxScore + 1;
    });

    dispatch(addRounds(newRound));
    dispatch(addTotals(totals));

    const outPlayers = inGamePlayers.filter((p) => totals[p.id] >= totalGameScore);
    const dangerPlayers = inGamePlayers.filter((p) => {
      const s = totals[p.id];
      return s >= (totalGameScore - dropScore) && s < totalGameScore;
    });
    dispatch(setOutPlayers(outPlayers));
    dispatch(setDangerPlayers(dangerPlayers));

    dispatch(
      setReEntryRounds({
        roundIndex: rounds.length,
        players: reEnteredPlayerIds,
      })
    );

    const outIdsAfter = new Set(outPlayers.map((p) => p.id));
    const reenteredNowIn = [...outIdsBefore].filter((id) => !outIdsAfter.has(id));
    const somebodyCameBack = reenteredNowIn.length > 0;

    if (somebodyCameBack) {
      
      const newOffSet = [...offSet];
      newOffSet[dealerId] = 1;

      const offsetValue = newOffSet[dealerId]; 
      const nextDealerId = (dealerId + offsetValue) % inGamePlayers.length;

      if (outIdsAfter.has(inGamePlayers[nextDealerId].id)) {
        newOffSet[dealerId] = offsetValue + 1;
        dispatch(setOffSet(newOffSet));
      } else {
        dispatch(setOffSet(newOffSet));
        dispatch(setDealerId(dealerId));
      }
    }

    setShowReentryModal(false);
  };

  const handleCancel = () => {
    setShowReentryModal(false);
  };

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
                  <View
                    style={[
                      Style.checkbox,
                      { backgroundColor: isSelected ? "#3498db" : "#fff" },
                    ]}
                  >
                    {isSelected && <Text style={Style.checkboxTick}>✓</Text>}
                  </View>
                  <Text style={Style.checkboxLabel}>
                    {index + 1}. {p.name}
                  </Text>
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
                <TouchableOpacity style={Style.modalClose} onPress={handleCancel}>
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

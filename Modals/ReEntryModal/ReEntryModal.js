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
  setPlayersLifeCycle,
  setStatus
} from "../../redux/reducers/gameState";
import { scaleFontSize } from "../../assets/Scaling";
import { useNavigation } from "@react-navigation/native";

const ReEntryModal = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const inGamePlayers = useSelector((store) => store.gameState.players || []);
  const inGamePlayersOut = useSelector((store) => store.gameState.inGameOutPlayers || []);
  const inGamePlayersDanger = useSelector((store) => store.gameState.inGameDangerPlayers || []);
  const totalScore = useSelector((store) => store.gameState.totalScore || {});
  const totalGameScore = useSelector((store) => store.gameState.totalGameScore || 0);
  const dropScore = useSelector((store) => store.gameState.dropScore || 0);
  const rounds = useSelector((store) => store.gameState.rounds || []);
  
  const dealerId = useSelector((store) => store.gameState.dealerId);
  const previousDealerId = useSelector((store) => store.gameState.previousDealerId);
  const playersLifeCycle = useSelector((store) => store.gameState.playersLifeCycle || []);
  

  const [showReentryModal, setShowReentryModal] = useState(false);
  const [reEntryScores, setReEntryScores] = useState([]);

  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [showWinnerName, setShowWinnerName] = useState();

  const [isPlusOneSelected, setIsPlusOneSelected] = useState(false);



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
      if(isPlusOneSelected === true)
      {
        newRound[id] = maxScore + 1;
        totals[id] = maxScore + 1;
      }
      else
      {
        newRound[id] = maxScore;
        totals[id] = maxScore;
      }
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

    const alivePlayers = inGamePlayers.filter((p) => totals[p.id] < totalGameScore);
    console.log(alivePlayers);
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

    const newPlayersLifeCycle = [...playersLifeCycle];
    let newDealerId = dealerId; 

    // check for players who were out but are now in because of re-entry.
    for (let i = 0; i < inGamePlayers.length; i++) {
      if (newPlayersLifeCycle[i] === rounds.length && 
          totals[inGamePlayers[i].id] < totalGameScore) {

        const prevPlayerIdx = (i === 0) ? inGamePlayers.length - 1 : i - 1;
        
        if (prevPlayerIdx === previousDealerId) {
          newDealerId = i;
        }
        
        newPlayersLifeCycle[i] = 0;
      }
    }
    dispatch(setPlayersLifeCycle(newPlayersLifeCycle));
    dispatch(setDealerId(newDealerId));

   
    
        
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

      {/* +1 for Re-entry Option */}
      <TouchableOpacity
        style={[Style.checkboxRow, { marginTop: 10 }]}
        onPress={() => setIsPlusOneSelected(prev => !prev)}
      >
        <View
          style={[
            Style.checkbox,
            { backgroundColor: isPlusOneSelected ? "#27ae60" : "#fff" },
          ]}
        >
          {isPlusOneSelected && <Text style={Style.checkboxTick}>✓</Text>}
        </View>
        <Text style={Style.checkboxLabel}>+1 for Re Entry</Text>
      </TouchableOpacity>

      {inGamePlayersOut.length > 0 && dangerPlayerIds.size === 0 ? (
        <View>
          <TouchableOpacity style={Style.modalClose} onPress={handleReentry}>
            <Text style={{ color: "#fff", fontSize: scaleFontSize(20) }}>
              Re-entry
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.modalClose} onPress={handleCancel}>
            <Text style={{ color: "#fff", fontSize: scaleFontSize(20) }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity style={Style.modalClose} onPress={handleCancel}>
            <Text style={{ color: "#fff", fontSize: scaleFontSize(20) }}>
              No Re-entry Available!
            </Text>
          </TouchableOpacity>
        </View>
      )}
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

export default ReEntryModal;

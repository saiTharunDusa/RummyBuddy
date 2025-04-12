import React, { act, useMemo, useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, Modal } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Style from "./Style";
import { useDispatch, useSelector } from "react-redux";
import { addRounds, addTotals, setDangerPlayers, setDealerId, setOutPlayers, setPreviousDealerId, setPlayersLifeCycle, setStatus,  } from "../../redux/reducers/gameState";

const ScoreModal = () => {
  const dispatch = useDispatch();
  const inGamePlayers = useSelector((store) => store.gameState.players || []);
  const totalScore = useSelector((store) => store.gameState.totalScore || {});
  const totalGameScore = useSelector((store) => store.gameState.totalGameScore || 0);
  const dropScore = useSelector((store) => store.gameState.drop || 0);
  const inGameOutPlayers = useSelector((store) => store.gameState.inGameOutPlayers || []);
  const dealerId = useSelector((store) => store.gameState.dealerId || 0);
  const playersLifeCycle = useSelector((store) => store.gameState.playersLifeCycle || []);
  const rounds = useSelector((store) => store.gameState.rounds || []);

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

    const newPlayersLifeCycle = [...playersLifeCycle];
    for(let i = 0; i < inGamePlayers.length; i++)
    {
      if(newPlayersLifeCycle[i] === undefined)
      {
        newPlayersLifeCycle[i] = 0;
      }
    }
    
    for (let i = 0; i < inGamePlayers.length; i++) {
      if (
        newPlayersLifeCycle[i] === 0 && 
        totals[inGamePlayers[i].id] >= totalGameScore
      ) {
        newPlayersLifeCycle[i] = rounds.length + 1;
      }
    }

    let idx = (dealerId + 1) % inGamePlayers.length;

    // normal flow and flow when immediate next person is out.
    if (!newPlayersLifeCycle[dealerId]) {
      while (idx !== dealerId) {
        if (newPlayersLifeCycle[idx] === rounds.length + 1) {
          idx = dealerId;
          break;
        } else if (!newPlayersLifeCycle[idx]) {
          break;
        }
        idx = (idx + 1) % inGamePlayers.length;
      }
    } else {
      while (idx !== dealerId) {
        if (!newPlayersLifeCycle[idx]) {
          break;
        }
        idx = (idx + 1) % inGamePlayers.length;
      }
    }
    
    dispatch(setPreviousDealerId(dealerId));

    dispatch(setDealerId(idx));
    dispatch(setPlayersLifeCycle(newPlayersLifeCycle));

    const alivePlayers = inGamePlayers.filter((p) => totals[p.id] < totalGameScore);
    console.log(alivePlayers);
    if(alivePlayers.length == 1)
    {

      dispatch(setStatus("completed"));
      console.log("completed!");
    }
    else
    {
      console.log("conintue");
      dispatch(setStatus("continue"));
    }
    
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

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SafeAreaView, Text, View, Modal, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Style from "./Style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faUsers, faGear, faPen} from "@fortawesome/free-solid-svg-icons";
import { addRounds, addTotals, initializeGame, setRounds } from "../../redux/reducers/gameState";
import firestore, { startAfter } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButton/BackButton";
import { useFocusEffect } from '@react-navigation/native';


const GameBoard = () => {
  const currentGame = useSelector((store) => store.gameState);
  const [inGamePlayers, setInGamePlayers] = useState([]);
  const [currentScores, setCurrentScores] = useState({});
  const [lastRoundScores, setLastRoundScores] = useState({});
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showMapping, setShowMapping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [inGameRounds, setInGameRounds] = useState([]);
  const [dropScore, setDropScore] = useState('');
  const [middleDropScore, setMiddleDropScore] = useState('');
  const [totalGameScore, setTotalGameScore] = useState('');
  const [fullCountScore, setFullCountScore] = useState('');
  const [totalGameAmount, setTotalGameAmount] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [showWinnerName, setShowWinnerName] = useState('');
  const [inGamePlayersDanger, setInGamePlayersDanger] = useState([]);
  const [inGamePlayersOut, setInGamePlayersOut] = useState([]);
  const [showReentryModal, setShowReentryModal] = useState(false);
  const [reEntryScores, setReEntryScores] = useState({});
  const [reEntryPlayerIndices, setReEntryPlayerIndices] = useState({});

  const navigation = useNavigation();

  const userId = auth().currentUser?.uid;
  const gameId = currentGame.gameId;
  const totals = currentGame.totalScore || {};


  const dangerPlayerIds = useMemo(() => {
    const temp = new Set(inGamePlayersDanger.map(p => p.id));
    return temp;
  }, [inGamePlayersDanger]) 

  const outPlayerIds = useMemo(()=>{
    const temp = new Set(inGamePlayersOut.map(p=>p.id));
    return temp;
  }, [inGamePlayersOut])

  const reentryIndicesSet = useMemo(() => {
    return new Set(Object.keys(reEntryPlayerIndices).map(Number));
  }, [reEntryPlayerIndices]);

  

  const dispatch = useDispatch();


  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const gameSnap = await firestore()
            .collection("users")
            .doc(userId)
            .collection("games")
            .doc(gameId)
            .get();

          const roundSnap = await firestore()
            .collection("users")
            .doc(userId)
            .collection("games")
            .doc(gameId)
            .collection("rounds")
            .orderBy("createdAt", "asc")
            .get();

          const gameData = gameSnap.data();
          const rounds = roundSnap.docs.map(doc => doc.data());
          const scoresArray = rounds.map(round => round.scores);

          dispatch(initializeGame({ ...gameData, gameId }));
          dispatch(setRounds(scoresArray));

          setInGamePlayers(gameData.players || []);
          setDropScore(gameData.drop || 0);
          setMiddleDropScore(gameData.middleDrop || 0);
          setFullCountScore(gameData.fullCount || 0);
          setTotalGameScore(gameData.totalGameScore || 0);
          setTotalGameAmount(gameData.totalGameAmount || 0);
          setInGameRounds(scoresArray);
          setLastRoundScores(scoresArray[scoresArray.length - 1] || {});

          const totals = gameData.totalScore || {};

          const alivePlayers = gameData.players.filter(p => totals[p.id] < gameData.totalGameScore);
          if (alivePlayers.length === 1) {
            setShowWinnerName(alivePlayers[0].name);
            setShowWinnerModal(true);
            await firestore()
                  .collection("users")
                  .doc(userId)
                  .collection("games")
                  .doc(gameId)
                  .update({status : 'completed'});
          }

          const playersOut = gameData.players.filter(p => totals[p.id] >= gameData.totalGameScore);
          setInGamePlayersOut(playersOut);

          const playersInDanger = gameData.players.filter(
            p => totals[p.id] >= (gameData.totalGameScore - gameData.drop)
          );
          setInGamePlayersDanger(playersInDanger);

        } catch (err) {
          console.log("Error reloading game state on focus:", err);
        }
      };

      if (userId && gameId) {
        fetchData();
      }
    }, [userId, gameId, dispatch])
  );

  const handleAddRound = async () => {
    try {
      const newRound = {
        scores: {},
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
  
      inGamePlayers.forEach(p => {
        newRound.scores[p.id] = Number(currentScores[p.id] ?? 0);
      });
  
      const allZero = Object.values(newRound.scores).every(score => score === 0);
      if (allZero) {
        alert("Please enter scores before adding a round.");
        return;
      }
  
      const updatedRounds = [...(inGameRounds || []), newRound.scores];
      setInGameRounds(updatedRounds);
      setCurrentScores({});
      setShowScoreModal(false);
      dispatch(addRounds(newRound.scores));
  
      await firestore()
        .collection("users")
        .doc(userId)
        .collection("games")
        .doc(gameId)
        .collection("rounds")
        .add(newRound);
  
      setLastRoundScores(newRound.scores);
  
      const totals = { ...(currentGame.totalScore || {}) };
      inGamePlayers.forEach(p => {
        totals[p.id] = (totals[p.id] || 0) + newRound.scores[p.id];
      });
  
      dispatch(addTotals(totals));
  
      await firestore()
        .collection("users")
        .doc(userId)
        .collection("games")
        .doc(gameId)
        .update({ totalScore: totals });
  
      const alivePlayers = inGamePlayers.filter(p => totals[p.id] < totalGameScore);
      if (alivePlayers.length === 1) {
        setShowWinnerName(alivePlayers[0].name);
        setShowWinnerModal(true);
        await firestore()
              .collection("users")
              .doc(userId)
              .collection("games")
              .doc(gameId)
              .update({
                status : 'completed'
              })
      }
  
      const playersOut = inGamePlayers.filter(p => totals[p.id] >= totalGameScore);
      setInGamePlayersOut(playersOut);

      const playersInDanger = inGamePlayers.filter(
        p => totals[p.id] >= (totalGameScore - dropScore)
      );
      setInGamePlayersDanger(playersInDanger);
  
    } catch (err) {
      console.log("ERROR : " + err);
    }
  };
  
    const handleCancel = () => {
        setShowScoreModal(false);
        setShowEditModal(false);
        setShowReentryModal(false);
    }

  const handleEditLastRound = async () => {
    try {
      const roundsSnap = await firestore()
        .collection("users")
        .doc(userId)
        .collection("games")
        .doc(gameId)
        .collection("rounds")
        .orderBy("createdAt", "asc")
        .get();
  
      const rounds = roundsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      const lastRound = rounds[rounds.length - 1];
      const lastRoundId = lastRound.id;
  
      const updatedRounds = [...(inGameRounds || [])];
      const tempRoundScores = {};
      const totals = { ...(currentGame.totalScore || {}) };
  
      inGamePlayers.forEach(p => {
        const newScore = Number(lastRoundScores[p.id] ?? 0);
        const oldScore = lastRound.scores?.[p.id] ?? 0;
  
        totals[p.id] = (totals[p.id] || 0) - oldScore + newScore;
  
        tempRoundScores[p.id] = newScore;
      });
  
      updatedRounds[updatedRounds.length - 1] = tempRoundScores;
  
      dispatch(setRounds(updatedRounds));
      dispatch(addTotals(totals));
  
      await firestore()
        .collection("users")
        .doc(userId)
        .collection("games")
        .doc(gameId)
        .collection("rounds")
        .doc(lastRoundId)
        .update({ scores: tempRoundScores });
  
      await firestore()
        .collection("users")
        .doc(userId)
        .collection("games")
        .doc(gameId)
        .update({ totalScore: totals });
  
      setInGameRounds(updatedRounds);
      setShowEditModal(false);

      const alivePlayers = inGamePlayers.filter(p => totals[p.id] < totalGameScore);
      if (alivePlayers.length === 1) {
        setShowWinnerName(alivePlayers[0].name);
        setShowWinnerModal(true);
      }
      else
      {
        await firestore()
              .collection("users")
              .doc(userId)
              .collection("games")
              .doc(gameId)
              .update({
                status : 'continue',
              })
      }
  
      const playersInDanger = inGamePlayers.filter(
        p => totals[p.id] >= (totalGameScore - dropScore)
      );
      setInGamePlayersDanger(playersInDanger);
  
      const playersOut = inGamePlayers.filter(p => totals[p.id] >= totalGameScore);
      setInGamePlayersOut(playersOut);
  
    } catch (err) {
      console.log("ERROR : " + err);
    }
  };
  
  const handleReentry = async () => {
    try {
      const newRound = {
        scores: {},
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
  
      const updatedReEntryScores = {};
      inGamePlayers.forEach((p) => {
        if (outPlayerIds.has(p.id) && reEntryScores[p.id] !== undefined) {
          updatedReEntryScores[p.id] = 0; 
        }
      });
  
      const validPlayers = inGamePlayers.filter((p) => !outPlayerIds.has(p.id));
      const notValidPlayers = inGamePlayers.filter((p)=>outPlayerIds.has(p.id));

      const totalScoreRow = currentGame.totalScore ?? {};
  
      notValidPlayers.forEach((p) => {
        const score = totalScoreRow[p.id] || 0;
        newRound.scores[p.id] = score;
      });

      let maxScore = 0;
  
      validPlayers.forEach((p) => {
        const score = totalScoreRow[p.id] || 0;
        newRound.scores[p.id] = score;
        maxScore = Math.max(maxScore, score);
      });

      Object.keys(updatedReEntryScores).forEach((id) => {
        newRound.scores[id] = maxScore + 1;
      });
  
      

      const updatedRounds = [...(inGameRounds || []), newRound.scores];
      setReEntryPlayerIndices(prev => ({
        ...prev,
        [updatedRounds.length - 1]: true
      }));
      
      
      console.log(reEntryPlayerIndices);

      setInGameRounds(updatedRounds);
      setShowReentryModal(false);
      dispatch(addRounds(newRound.scores));
  
      await firestore()
        .collection("users")
        .doc(userId)
        .collection("games")
        .doc(gameId)
        .collection("rounds")
        .add(newRound);
  
      setLastRoundScores(newRound.scores);

      dispatch(addTotals(newRound.scores));
      
      console.log(newRound.scores);

      await firestore()
        .collection("users")
        .doc(userId)
        .collection("games")
        .doc(gameId)
        .update({ totalScore: newRound.scores });
  
      const alivePlayers = inGamePlayers.filter(p => newRound.scores[p.id] < totalGameScore);
      if (alivePlayers.length === 1) {
        setShowWinnerName(alivePlayers[0].name);
        setShowWinnerModal(true);
      }
  
      const playersOut = inGamePlayers.filter(p => newRound.scores[p.id] >= totalGameScore);
      setInGamePlayersOut(playersOut);

      const playersInDanger = inGamePlayers.filter(
        p => newRound.scores[p.id] >= (totalGameScore - dropScore)
      );
      setInGamePlayersDanger(playersInDanger);


    } catch (err) {
      console.log("ERROR : ", err);
    }
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/** Title */}
      <View style={Style.back} >
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={Style.mainHeading}>
          Rummy Scoreboard
        </Text>
      </View>

        {/** Players Row. */}
        <View style={Style.headerRow}>
          <Text style={Style.roundLabel}>#</Text>
          {inGamePlayers.map((player, index) => {
            const isDanger = dangerPlayerIds.has(player.id);
            const isOut = outPlayerIds.has(player.id);
            return (
              <Text
                key={index}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: isOut ? '#ff0505': isDanger ? '#ff8f00' : '#3498db',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  paddingVertical: 6,
                  marginHorizontal: 6,
                  backgroundColor: isOut ? '#ff0505': isDanger ? '#ff8f00' : '#3498db',
                  flex: 1,
                  fontWeight: 'bold',
                }}
              >
                {index + 1}
              </Text>
            );
          })}
        </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={Style.scrollContent}>
        {/** Each Round Row. */}
        {inGameRounds.map((round, index) => {
          const isReentryRow = reentryIndicesSet.has(index);
          return (
            <View
              key={index}
              style={[
                Style.row,
                {
                  backgroundColor: isReentryRow ? '#B3E5FC' : 'transparent', // Light green for reentry
                  borderRadius: 10,
                  paddingVertical: 4,
                },
              ]}
            >
              <Text style={Style.roundLabel}>{index + 1}</Text>
              {inGamePlayers.map((p) => (
                <Text key={p.id} style={[Style.cell, { flex: 1 }]}>
                  {round[p.id]}
                </Text>
              ))}
            </View>
          );
        })}


        {/** Total Row */}
        <View style={[Style.row, Style.totalRow]}>
          <Text style={Style.roundLabel}>T</Text>
          {inGamePlayers.map((p) => {
            return (
              <Text
                key={p.id}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#3498db',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  paddingVertical: 6,
                  marginHorizontal: 6,
                  backgroundColor: '#3498db',
                  flex: 1,
                  fontWeight: 'bold',
                }}
              >
                {totals[p.id] ?? 0}
              </Text>
            );
          })}
        </View>

      </ScrollView>

      {/* Floating Buttons */}
      <View style={Style.fabRow}>
        <TouchableOpacity style={Style.fab} onPress={() => setShowScoreModal(true)}>
          <FontAwesomeIcon icon={faPlus} size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={Style.fab} onPress={() => setShowMapping(true)}>
          <FontAwesomeIcon icon={faUsers} size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={Style.fab} onPress={() => setShowSettings(true)}>
          <FontAwesomeIcon icon={faGear} size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={Style.fab} onPress={() => setShowEditModal(true)}>
          <FontAwesomeIcon icon={faPen} size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={Style.fab} onPress={() => setShowReentryModal(true)}>
          <Text style={{ color: '#fff', fontSize: 19, fontWeight: 'bold' }}>R</Text>
        </TouchableOpacity>
      </View>

      {/* Score Modal */}
      <Modal visible={showScoreModal} transparent animationType="fade">
        <View style={Style.modalBackground}>
          <View style={Style.modalBox}>
            <Text style={Style.modalTitle}>Enter Scores</Text>
            
            {inGamePlayers.map((p, index) => {
              if (outPlayerIds.has(p.id)) return null;
              return (
                <View key={p.id} style={Style.scoreInputRow}>
                  <Text style={Style.playerLabel}>{index + 1}</Text>
                  <Text style={Style.playerName}>{p.name}</Text>
                  <TextInput
                    style={Style.input}
                    keyboardType="numeric"
                    value={currentScores[p.id]?.toString() || ''}
                    onChangeText={(val) =>
                      setCurrentScores((prev) => ({ ...prev, [p.id]: val }))
                    }
                  />
                </View>
              );
            })}

            <TouchableOpacity style={Style.modalClose} onPress={handleAddRound}>
              <Text style={{ color: '#fff' }}>Add Round</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Style.modalClose} onPress={handleCancel}>
              <Text style={{ color: '#fff' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {/* Mapping Modal */}
      <Modal visible={showMapping} transparent animationType="fade">
        <View style={Style.modalBackground}>
          <View style={Style.modalBox}>
            <Text style={Style.modalTitle}>Player Mapping</Text>
            {inGamePlayers.map((p, index) => (
              <Text key={p.id} style={Style.mappingText}>
                {index + 1} → {p.name}
              </Text>
            ))}
            <TouchableOpacity style={Style.modalClose} onPress={() => setShowMapping(false)}>
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Game Settings */}
      <Modal visible={showSettings} transparent animationType="fade">
        <View style={Style.modalBackground}>
          <View style={Style.modalBox}>
            <Text style={Style.modalTitle}>Game Settings</Text>
            {[
              { label: 'Drop', value: dropScore },
              { label: 'Middle Drop', value: middleDropScore },
              { label: 'Full Count', value: fullCountScore },
              { label: 'Game Score', value: totalGameScore },
              { label: 'Total Amount', value: totalGameAmount },
            ].map((item, index) => (
              <View key={index} style={Style.settingsRow}>
                <Text style={Style.settingsLabel}>{item.label}</Text>
                <Text style={Style.settingsValue}>{item.value}</Text>
              </View>
            ))}
            <TouchableOpacity style={Style.modalClose} onPress={() => setShowSettings(false)}>
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        {/* Edit Score Modal */}
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
                    value={lastRoundScores[p.id]?.toString() || ''}
                    onChangeText={(val) =>
                        setLastRoundScores((prev) => ({ ...prev, [p.id]: val }))
                    }
                    />
                </View>
                ))}
                <TouchableOpacity style={Style.modalClose} onPress={handleEditLastRound}>
                <Text style={{ color: '#fff' }}>Edit Round</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.modalClose} onPress={handleCancel}>
                <Text style={{ color: '#fff' }}>Cancel</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>

        {/** Winner Name Displaying */}
        <Modal visible={showWinnerModal} transparent animationType="fade">
          <View style={Style.modalBackground}>
            <View style={Style.modalBox}>
              <Text style={Style.modalTitle}>🎉 Congratulations!</Text>
              <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 10 }}>
                {showWinnerName} is the winner!
              </Text>
              <TouchableOpacity style={Style.modalClose} onPress={() => setShowWinnerModal(false)}>
                <Text style={{ color: '#fff' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Reentry Modal */}
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
                    if (isSelected) {
                      delete updated[p.id];
                    } else {
                      updated[p.id] = 0;
                    }
                    return updated;
                  });
                }}
              >
                <View
                  style={[
                    Style.checkbox,
                    { backgroundColor: isSelected ? '#3498db' : '#fff' },
                  ]}
                >
                  {isSelected && (
                    <Text style={Style.checkboxTick}>✓</Text>
                  )}
                </View>
                <Text style={Style.checkboxLabel}>
                  {index + 1}. {p.name}
                </Text>
              </TouchableOpacity>
            );
          })}

          {inGamePlayersDanger.length > 0 ? (
            <View>
              <TouchableOpacity style={Style.modalClose} onPress={handleReentry}>
                <Text style={{ color: '#fff' }}>Re-entry</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.modalClose} onPress={handleCancel}>
                <Text style={{ color: '#fff' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity style={Style.modalClose} onPress={handleCancel}>
                <Text style={{ color: '#fff' }}>No Re-entry Available!</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>


    </SafeAreaView>
  );
};

export default GameBoard;

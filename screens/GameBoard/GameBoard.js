import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, Text, View, Modal, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Style from "./Style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faUsers, faGear, faPen } from "@fortawesome/free-solid-svg-icons";
import { addRounds, addTotals, initializeGame, setRounds } from "../../redux/reducers/gameState";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButton/BackButton";
import Title from "../../components/Title/Title";

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

  const navigation = useNavigation();

  const userId = auth().currentUser?.uid;
  const gameId = currentGame.gameId;

  const dispatch = useDispatch();

  useEffect(() => {
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
  
        // set UI state
        setInGamePlayers(gameData.players || []);
        setDropScore(gameData.drop || 0);
        setMiddleDropScore(gameData.middleDrop || 0);
        setFullCountScore(gameData.fullCount || 0);
        setTotalGameScore(gameData.totalGameScore || 0);
        setTotalGameAmount(gameData.totalGameAmount || 0);
        setInGameRounds(scoresArray);
        setLastRoundScores(scoresArray[scoresArray.length - 1] || {});
      } catch (err) {
        console.log("Error fetching game data:", err);
      }
    };
  
    if (userId && gameId) {
      fetchData();
    }
  }, [userId, gameId, dispatch]);
  

  const handleAddRound = async () => {
    try {
      const newRound = {
        scores: {}, 
        createdAt: firestore.FieldValue.serverTimestamp()
      };
      inGamePlayers.forEach(p => {
        newRound.scores[p.id] = Number(currentScores[p.id]) || 0;
      });
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

      // Update total scores
      const totals = {};
      inGamePlayers.forEach(p => {
        totals[p.id] = updatedRounds.reduce((sum, r) => sum + (r[p.id] || 0), 0);
      });

      dispatch(addTotals(totals));
      await firestore()
        .collection("users")
        .doc(userId)
        .collection("games")
        .doc(gameId)
        .update({ totalScore: totals });

      // const alivePlayers = inGamePlayers.filter(p=>totals[p.id] < totalGameScore);

      // if(alivePlayers.length == 1)
      // {
      //   setShowWinnerName(alivePlayers[0].name);
      //   setShowWinnerModal(true);
      // }
      



    } catch (err) {
      console.log("ERROR : " + err);
    }
  };

    const handleCancel = () => {
        setShowScoreModal(false);
        setShowEditModal(false);
    }

  const totals = useCallback(() => {
    const total = {};
    inGamePlayers.forEach(p => {
      total[p.id] = inGameRounds.reduce((sum, r) => sum + (r[p.id] || 0), 0);
    });
    return total;
  }, [inGamePlayers, inGameRounds])();

  const handleEditLastRound = async () => {
    try {
      const updatedRounds = [...(inGameRounds || [])];
      const tempRoundScores = {};
      inGamePlayers.forEach(p => {
        tempRoundScores[p.id] = Number(lastRoundScores[p.id]) || 0;
      });
  
      updatedRounds[updatedRounds.length - 1] = tempRoundScores;
      dispatch(setRounds(updatedRounds));
  
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
  
      const lastRoundId = rounds[rounds.length - 1].id;
  
      await firestore()
        .collection("users")
        .doc(userId)
        .collection("games")
        .doc(gameId)
        .collection("rounds")
        .doc(lastRoundId)
        .update({ scores: tempRoundScores });
  
      const totals = {};
      inGamePlayers.forEach(p => {
        totals[p.id] = updatedRounds.reduce((sum, r) => sum + (r[p.id] || 0), 0);
      });
      dispatch(addTotals(totals));
  
      await firestore()
        .collection("users")
        .doc(userId)
        .collection("games")
        .doc(gameId)
        .update({ totalScore: totals });
  
      setInGameRounds(updatedRounds);
      setShowEditModal(false);
    } catch (err) {
      console.log("ERROR : " + err);
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
        {inGamePlayers.map((_, index) => (
          <Text key={index} style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#3498db',
            textAlign: 'center',
            color : '#FFFFFF',
            paddingVertical: 6,
            marginHorizontal: 6,
            backgroundColor: '#3498db',
            flex : 1,
            fontWeight : 'bold'
          }}>
            {index + 1}
          </Text>
        ))}
      </View>

      <ScrollView contentContainerStyle={Style.scrollContent}>
        {/** Each Round Row. */}
        {inGameRounds.map((round, index) => (
          <View key={index} style={Style.row}>
            <Text style={Style.roundLabel}>{index + 1}</Text>
            {inGamePlayers.map((p) => (
              <Text key={p.id} style={[Style.cell, { flex: 1 }]}>
                {round[p.id]}
              </Text>
            ))}
          </View>
        ))}
        {/** Total Row */}
        <View style={[Style.row, Style.totalRow]}>
          <Text style={Style.roundLabel}>T</Text>
          {inGamePlayers.map((p) => (
            <Text key={p.id} style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#3498db',
              textAlign: 'center',
              color : '#FFFFFF',
              paddingVertical: 6,
              marginHorizontal: 6,
              backgroundColor: '#3498db',
              flex : 1,
              fontWeight : 'bold'
            }}>
              {totals[p.id]}
            </Text>
          ))}
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
      </View>

      {/* Score Modal */}
      <Modal visible={showScoreModal} transparent animationType="fade">
        <View style={Style.modalBackground}>
          <View style={Style.modalBox}>
            <Text style={Style.modalTitle}>Enter Scores</Text>
            {inGamePlayers.map((p, index) => (
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
            ))}
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



    </SafeAreaView>
  );
};

export default GameBoard;

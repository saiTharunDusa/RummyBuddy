import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, Text, View, ScrollView, Modal, TouchableOpacity, TextInput} from "react-native";
import { useSelector } from "react-redux";
import Style from "./Style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

const GameBoard = () => {
    const [gameId, setGameId] = useState('');
    const [inGamePlayers, setInGamePlayers] = useState([]);
    const [inGameRounds, setInGameRounds ] = useState([]);
    const [currentScores, setCurrentScores] = useState([]);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [showMapping, setShowMapping] = useState(false);

    const currentGame = useSelector((store)=> store.gameState);
    useEffect(()=>{
        setInGamePlayers(currentGame.players);
        setInGameRounds(currentGame.rounds);
        setGameId(currentGame.gameId);
    }, [currentGame.players])
    
    console.log(inGamePlayers);
   
    const handleAddRound = ()=>{
        const newRound = {};
        inGamePlayers.forEach(p => {
        newRound[p.id] = Number(currentScores[p.id]) || 0;
        });
        setInGameRounds([...inGameRounds, newRound]);
        setCurrentScores({});
        setShowScoreModal(false);
    }

    const handleCancel = () => {
        setShowScoreModal(false);
    }

    const calculateTotals = useCallback(()=>{
        const totals = {};
        inGamePlayers.forEach(p => {
            totals[p.id] = inGameRounds.reduce((sum, r) => sum + (r[p.id] || 0), 0)
        });
        return totals;
    }, [inGameRounds, inGamePlayers]);
    const totals = calculateTotals();

    return(
        <SafeAreaView>

            {/* Player number row */}
            <View style={Style.headerRow}>
                <Text style={Style.roundLabel}>#</Text>
                {inGamePlayers.map((_, index) => (
                <Text key={index} style={[Style.cell, { flex: 1 }]}>
                    {index + 1}
                </Text>
                ))}
            </View>

            {/* Score rows */}
            <ScrollView contentContainerStyle={Style.scrollContent}>
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

                {/* Total row with distinct style */}
                <View style={[Style.row, Style.totalRow]}>
                    <Text style={Style.roundLabel}>T</Text>
                    {inGamePlayers.map((p) => (
                        <Text key={p.id} style={[Style.cell, { flex: 1, fontWeight: 'bold' }]}>
                            {totals[p.id]}
                        </Text>
                    ))}
                </View>
            </ScrollView>


            {/* Score input modal */}
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

            {/* Player Mapping Modal */}
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


            {/* Floating buttons */}
            <View style={Style.fabRow}>
                <TouchableOpacity style={Style.fab} onPress={() => setShowScoreModal(true)}>
                    <FontAwesomeIcon icon={faPlus} size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={Style.fab} onPress={() => setShowMapping(true)}>
                    <FontAwesomeIcon icon={faUsers} size={20} color="#fff" />
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    )
}

export default GameBoard 
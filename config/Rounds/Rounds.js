import {React, useEffect, useState} from "react"
import { SafeAreaView, Modal, View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Style from "./Style";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";
import { horizontalScale, verticalScale } from "../../assets/Scaling";

const Rounds = () => {
    const navigation = useNavigation();
    const totals = useSelector((store) => store.gameState.totalScore || {});
    const inGameRounds = useSelector((store) => store.gameState.rounds || []);
    const inGamePlayers = useSelector((store) => store.gameState.players || []);
    const reEntryRounds = useSelector((store) => store.gameState.reEntryRounds || []);
    const totalGameScore = useSelector((store) => store.gameState.totalGameScore);

    const [showWinnerModal, setShowWinnerModal] = useState(false);
    const [showWinnerName, setShowWinnerName] = useState(false);

    useEffect(() => {
        const alivePlayers = inGamePlayers.filter((p) => totals[p.id] < totalGameScore);
        if(alivePlayers.length == 1)
        {
            setShowWinnerModal(true);
            setShowWinnerName(alivePlayers[0].name);
        }
    },[totals]);

    return (
        <SafeAreaView>
            
            
            {/** Each Round Row. */}
            {inGameRounds.map((round, index) => {
            const currentReentryEntry = reEntryRounds.find((entry) => entry.roundIndex === index);
            const reentryPlayers = Array.isArray(currentReentryEntry?.players)
  ? currentReentryEntry.players
  : [];

            const isReentryRound = !!currentReentryEntry;
            
                
            return (
                <View 
                    key={index}
                    style={[Style.row,
                            {
                            backgroundColor: isReentryRound ? '#B3E5FC' : 'transparent',
                            borderRadius: 10,
                            paddingVertical: 4,
                            },
                          ]}
                >
                    <Text style={Style.roundLabel}>{index + 1}</Text>
                        {inGamePlayers.map((p) => {
                        const isReenteredPlayer = reentryPlayers.includes(p.id);

                        return (
                            <Text
                                key={p.id}
                                style={[Style.cell,
                                        {
                                        flex: 1,
                                        backgroundColor: isReenteredPlayer ? '#008000' : '#3498db',
                                        color: '#fff',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 8,
                                        },
                                ]}
                            >
                                {round[p.id]}
                            </Text>
                        );
                })}
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
                            paddingVertical: verticalScale(6),
                            marginHorizontal: horizontalScale(6),
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

                {/** Winner Name Displaying */}
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
    )
}

export default Rounds;
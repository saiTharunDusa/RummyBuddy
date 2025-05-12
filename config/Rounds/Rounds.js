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
    const status = useSelector((store) => store.gameState.status);

    const [showWinnerModal, setShowWinnerModal] = useState(false);
    const [showWinnerName, setShowWinnerName] = useState();

    useEffect(() => {
        if(status === 'completed')
        {
            const alivePlayers = inGamePlayers.filter((p) => totals[p.id] < totalGameScore);
            console.log(alivePlayers);
            if(alivePlayers.length === 1)
            {
                setShowWinnerModal(true);
                setShowWinnerName(alivePlayers[0].name);
            }
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
                            paddingVertical: verticalScale(),
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
                    <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={Style.modalTitle}>🎉 Congratulations!</Text>
                    <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={{ textAlign: 'center', fontSize: 18, marginVertical: 10 }}>
                        {showWinnerName} is the winner!
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
  <TouchableOpacity
    style={[Style.modalClose, { flex: 1, marginRight: 5 }]}
    onPress={() => {
      setShowWinnerModal(false);
      navigation.navigate(Routes.Compromise);
    }}
  >
    <Text adjustsFontSizeToFit numberOfLines={1} style={{ color: '#fff', textAlign: 'center' }}>
      Amount Won
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[Style.modalClose, { flex: 1, marginLeft: 5 }]}
    onPress={() => setShowWinnerModal(false)}
  >
    <Text adjustsFontSizeToFit numberOfLines={1} style={{ color: '#fff', textAlign: 'center' }}>
      Close
    </Text>
  </TouchableOpacity>
</View>

                    </View>
                </View>
      </Modal>


        </SafeAreaView>
    )
}

export default Rounds;
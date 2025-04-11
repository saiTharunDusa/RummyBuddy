import {React, useEffect, useState} from "react"
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { useSelector } from "react-redux";
import Style from "./Style";

const Rounds = () => {
    
    const totals = useSelector((store) => store.gameState.totalScore || {});
    const inGameRounds = useSelector((store) => store.gameState.rounds || []);
    const inGamePlayers = useSelector((store) => store.gameState.players || []);
    const reEntryRounds = useSelector((store) => store.gameState.reEntryRounds || []);


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
        </SafeAreaView>
    )
}

export default Rounds;
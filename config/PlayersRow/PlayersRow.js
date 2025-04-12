import {React, useEffect, useState, useMemo, act} from "react";
import { SafeAreaView, View, Text} from "react-native";
import Style from "./Style";
import { useSelector } from "react-redux";

const PlayersRow = () => {

    const inGamePlayers = useSelector((store) => store.gameState.players || []);
    const inGamePlayersOut = useSelector((store) => store.gameState.inGameOutPlayers || []);
    const inGamePlayersDanger = useSelector((store) => store.gameState.inGameDangerPlayers || []);
    const dealerId = useSelector((store) => store.gameState.dealerId || 0);
    

    const outPlayerIds = useMemo(() => new Set(inGamePlayersOut.map((p) => p.id)), [inGamePlayersOut]);
    const dangerPlayerIds = useMemo(() => new Set(inGamePlayersDanger.map((p) => p.id)), [inGamePlayersDanger]);

    


    return (
        <SafeAreaView>
            <View style={Style.headerRow}>
                <Text style={Style.roundLabel}>#</Text>
                {inGamePlayers.map((player, index) => {
                    const isDanger = dangerPlayerIds.has(player.id);
                    const isOut = outPlayerIds.has(player.id);
                    const isDistributor = index === dealerId;
                
                    return (
                    <Text
                        key={index}
                        style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        borderWidth : isDistributor ? 5 : 2,
                        borderColor: isDistributor ? '#1ABC9C' : isOut ? '#ff0505' : isDanger ? '#ff8f00' : '#3498db',
                        textAlign: 'center',
                        color: '#FFFFFF',
                        paddingVertical: 6,
                        marginHorizontal: 6,
                        backgroundColor: isOut ? '#ff0505' : isDanger ? '#ff8f00' : '#3498db',
                        flex: 1,
                        fontWeight: 'bold',
                        }}
                    >
                        {index + 1}
                    </Text>
                    );
                })}
		    </View>
        </SafeAreaView>

    )
}

export default PlayersRow
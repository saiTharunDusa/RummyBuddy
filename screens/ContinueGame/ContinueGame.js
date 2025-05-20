import React, { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth";
import moment from 'moment';
import { useDispatch } from "react-redux";
import { initializeGame, resetGameBoard } from "../../redux/reducers/gameState";
import { useNavigation } from '@react-navigation/native';
import { selectPlayer } from "../../redux/reducers/selectedPlayers";
import Style from "./Style";
import BackButton from "../../components/BackButton/BackButton";

const ContinueGame = () => {
    const userId = auth().currentUser?.uid;
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [continueGames, setContinueGames] = useState();
    

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const gamesSnap = await firestore()
                    .collection("users")
                    .doc(userId)
                    .collection("games")
                    .where("status", "==", "continue")
                    .orderBy("createdAt", "desc")
                    .get();
            
                const gamesData = gamesSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setContinueGames(gamesData);
            }
            catch (err) {
                console.log("ERROR : " + err);
            }
        }
        fetchGames();
    }, [])

    const handleContinueGame = async (item) => {
        try {
            const roundsSnap = await firestore()
                .collection("users")
                .doc(userId)
                .collection("games")
                .doc(item.id)
                .collection("rounds")
                .orderBy("createdAt", "asc")
                .get();
            const currentGameRounds = roundsSnap.docs.map(doc => ({ ...doc.data() }))

            dispatch(initializeGame({
                gameId: item.id,
                status: item.status,
                drop: item.drop,
                middleDrop: item.middleDrop,
                fullCount: item.fullCount,
                totalGameScore: item.totalGameScore,
                totalGameAmount: item.totalGameAmount,
                totalGameAmountFixed: item.totalGameAmount,
                players: item.players,
                rounds: currentGameRounds,
                totalScore: item.totalScore,
                inGameOutPlayers: item.inGameOutPlayers,
                inGameDangerPlayers: item.inGameDangerPlayers,
                reEntryRounds: item.reEntryRounds,
                dealerId: item.dealerId,
                previousDealerId: item.previousDealerId,
                playersLifeCycle: item.playersLifeCycle,
            }));
            dispatch(selectPlayer(item.players));
            navigation.navigate('GameBoard');
        }
        catch (err) {
            console.log("ERROR : " + err);
        }
    }

    const renderItem = useCallback(({ item, index }) => {
        const createdAt = item.createdAt?.toDate?.(); 
        const formattedTime = createdAt
            ? moment(createdAt).format('MMM DD, YYYY hh:mm A')
            : 'Unknown time';
        return (
            <View style={Style.gameCard}>
                <TouchableOpacity onPress={() => handleContinueGame(item)}>
                    <Text style={Style.gameTitle}>
                        Game {index + 1}
                    </Text>
                    <Text style={Style.gameDate}>
                        Created at: {formattedTime}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }, []);

    return (
        <SafeAreaView style={Style.container}>
            <View style={Style.headerContainer}>
                <BackButton onPress={() => navigation.goBack()} />
                <Text style={Style.headerTitle}>Incompleted Games</Text>
            </View>
            <FlatList
                data={continueGames}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

export default ContinueGame;
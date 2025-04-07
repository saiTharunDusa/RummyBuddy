import React, { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth";
import moment from 'moment';
import { useDispatch } from "react-redux";
import { initializeGame } from "../../redux/reducers/gameState";
import { useNavigation } from '@react-navigation/native';
import { selectPlayer } from "../../redux/reducers/selectedPlayers";


const ContinueGame = () => {
    const userId = auth().currentUser?.uid;
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [continueGames, setContinueGames] = useState();
    

    useEffect(()=>{
        const fetchGames = async () => {
            try{
                const gamesSnap = await firestore()
                .collection("users")
                .doc(userId)
                .collection("games")
                .where("status","==","continue")
                .get();
            
                const gamesData = gamesSnap.docs.map(doc=>({
                    id : doc.id,
                    ...doc.data()
                }))
                setContinueGames(gamesData);
            }
            catch(err)
            {
                console.log("ERROR : " + err);
            }
        }
        fetchGames();
    }, [])


    const handleContinueGame = async (item) => {
        try{
           
            const roundsSnap = await firestore()
                                            .collection("users")
                                            .doc(userId)
                                            .collection("games")
                                            .doc(item.id)
                                            .collection("rounds")
                                            .get();
            const currentGameRounds = roundsSnap.docs.map(doc=>({...doc.data()}))
            dispatch(initializeGame({
                gameId: item.id,
                drop: item.drop,
                middleDrop: item.middleDrop,
                fullCount: item.fullCount,
                totalGameScore: item.totalGameScore,
                totalGameAmount: item.totalGameAmount,
                players: item.players,
                rounds: currentGameRounds,
                totalScore : item.totalScore
            }));
            dispatch(selectPlayer(item.players));
            navigation.navigate('GameBoard');
        }
        catch(err)
        {
            console.log("ERROR : " + err);
        }
        
    }

    const renderItem = useCallback(({ item, index }) => {
        const createdAt = item.createdAt?.toDate?.(); 
        const formattedTime = createdAt
          ? moment(createdAt).format('MMM DD, YYYY hh:mm A')
          : 'Unknown time';
        return (
          <View style={{
            backgroundColor: '#3498db',
            marginHorizontal: 16,
            marginVertical: 8,
            borderRadius: 10,
            padding: 16,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 4,
          }}>
            <TouchableOpacity onPress={()=>handleContinueGame(item)} >
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
                Game {index + 1}
                </Text>
                <Text style={{ fontSize: 14, color: '#ecf0f1', marginTop: 4 }}>
                Created at: {formattedTime}
                </Text>
            </TouchableOpacity>
          </View>
        );
      }, []);



    return(
        <SafeAreaView>
            <Text
                style={{
                    fontWeight : "bold",
                    textAlign : 'center',
                    fontSize : '24',
                    color : '#3498db',

                }}
            >Continue Game</Text>
            <FlatList
                data= {continueGames}
                key={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

export default ContinueGame;
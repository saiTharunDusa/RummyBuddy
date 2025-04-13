import {React, use, useState} from "react";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import { useGoToHome } from "../../navigation/GoToHome";
import Style from "./Style";
import BackButton from "../../components/BackButton/BackButton";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";


const GameBoardTitle = () => {
    const goToHome = useGoToHome();
    const [showInfo, setShowInfo] = useState(false);
    const gameState = useSelector((store) => store.gameState);
    console.log(gameState);

    const gameId = useSelector((store) => store.gameState.gameId);
    const userId = auth().currentUser?.uid;


    const handleBackPress = async () => {
        try{
            const roundsRef = firestore()
                              .collection("users")
                              .doc(userId)
                              .collection("games")
                              .doc(gameId)
                              .collection("rounds");

            const batch = firestore().batch();

            gameState.rounds.forEach((round, index) => {
            const docRef = roundsRef.doc(index.toString()); 
            batch.set(docRef, {
                ...round,
                createdAt: firestore.FieldValue.serverTimestamp(),
                updatedAt: firestore.FieldValue.serverTimestamp(),
            });
            });

            await batch.commit();

            await firestore()
                  .collection("users")
                  .doc(userId)
                  .collection("games")
                  .doc(gameId)
                  .update({
                    ...gameState,
                    updatedAt : firestore.FieldValue.serverTimestamp(),
                  })
                  console.log(gameState);
        }
        catch(err){
            console.log("ERROR : ", err);
        }
        goToHome();
    }
    return(
        <SafeAreaView>
        {/* Title and Game Info Toggle */}
        <View style={{ paddingHorizontal: 16, paddingTop: 10, marginBottom : 5 }}>
                {/* Top Row: Back + Title */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ position: 'absolute', left: 0 }}>
                        <BackButton onPress={()=>handleBackPress()} />
                    </View>
                    <Text style={[Style.mainHeading, { textAlign: 'center' }]}>Rummy Scoreboard</Text>
                </View>

                {/* Game Info Toggle */}
                <View style={{ alignItems: 'center', marginTop: 6 }}>
                <TouchableOpacity
                    style={{
                    backgroundColor: '#3498db',
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                    borderRadius: 6,
                    }}
                    onPress={() => setShowInfo(!showInfo)}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>
                    {showInfo ? 'Hide Game Info ▲' : 'Show Game Info ▼'}
                    </Text>
                </TouchableOpacity>
                </View>

                {/* Game Info Panel */}
                {showInfo && (
                <View
                    style={{
                        backgroundColor: '#AED6F1',
                        marginTop: 6,
                        padding: 12,
                        borderRadius: 10,
                    }}
                >
                    <Text style={{ lineHeight: 20 }}>
                    <Text style={{ color: '#ff8f00' }}>● </Text> – Tells that the player has no drops left.{"\n"}
                        <Text style={{ color: '#ff0505' }}>● </Text> – Tells that the player is out of the game.{"\n"}
                        <Text style={{ color: '#008000' }}>● </Text> – Tells that the player has re-entered.{"\n"}
                        <Text style={{ color: '#B3E5FC' }}>● </Text> – Reentry round.{"\n"}
                        <Text style={{ color: '#00BFFF' }}>● </Text> – Total Row.
                    </Text>
                </View>
                )}
            </View>
    </SafeAreaView>
    )
}

export default GameBoardTitle;
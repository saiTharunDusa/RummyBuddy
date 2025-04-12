import { TouchableOpacity, SafeAreaView, Text, View, TextInput, Alert } from 'react-native'
import Style from './Style'
import BackButton from '../../components/BackButton/BackButton'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth';
import { initializeGame, resetGameBoard } from '../../redux/reducers/gameState'
import firestore from '@react-native-firebase/firestore';
import { resetAllSelectedPlayers } from '../../redux/reducers/selectedPlayers'



const StartGame = ({navigation}) => {

    const [totalGameScore, setTotalGameScore] = useState('100');
    const [dropScore, setDropScore] = useState('25');
    const [middleDropScore, setMiddleDropScore] = useState('40');
    const [fullCountScore, setFullCountScore] = useState('80');
    const [totalGameAmount, setTotalGameAmount] = useState('');

    const selectedPlayersList = useSelector((store) => store.selectedPlayers.list);
    const dispatch = useDispatch();

    const handleBtn = async () => {
        try {
          if (
            totalGameScore <= 0 ||
            dropScore <= 0 ||
            middleDropScore <= 0 ||
            fullCountScore <= 0 ||
            totalGameAmount <= 0
          ) {
            return Alert.alert("Please check the game scores and total amount!");
          } else if (selectedPlayersList.length <= 1) {
            return Alert.alert("Please select at least 2 players!");
          }
          const offSetArr = selectedPlayersList.map(() => 1);

          const userId = auth().currentUser?.uid;
          const gameRef = await firestore()
            .collection('users')
            .doc(userId)
            .collection('games')
            .add({
              drop: dropScore,
              middleDrop: middleDropScore,
              fullCount: fullCountScore,
              totalGameScore: totalGameScore,
              totalGameAmountFixed: totalGameAmount,
              totalGameAmount : totalGameAmount,
              players: selectedPlayersList,
              status: 'continue',
              totalScore : [],
              inGameOutPlayers : [],
              inGameDangerPlayers : [],
              reEntryRounds : [],
              dealerId : 0,
              offSet : offSetArr,
              createdAt: firestore.FieldValue.serverTimestamp()
            });
            dispatch(resetGameBoard());
            dispatch(initializeGame({
                gameId : gameRef.id,
                drop : dropScore,
                middleDrop: middleDropScore,
                fullCount: fullCountScore,
                totalGameScore: totalGameScore,
                totalGameAmount: totalGameAmount,
                totalGameAmountFixed : totalGameAmount,
                players: selectedPlayersList,
                rounds: [],
                totalScore : [],
                inGameOutPlayers : [],
                inGameDangerPlayers : [],
                reEntryRounds : [],
                dealerId : 0,
                offSet : offSetArr,
            }))
            dispatch(resetAllSelectedPlayers());
            navigation.navigate('GameBoardTemp');
        } catch (error) {
            console.log(error);
        }
      };


    return (
        <SafeAreaView style={Style.container}>
            {/**
             * 
             * Top Title Container.
             */}
            <View style={Style.topContainer}>
                <View style={Style.back} >
                    <BackButton onPress={() => navigation.goBack()} />
                </View>
                <Text style={Style.text1}>
                        Add Players to the game!
                </Text>
            </View> 

            {
            /**
             *  Add Players container.
             */
            }
            <View style={Style.addPlayers}>  
                <TouchableOpacity onPress={() => navigation.navigate('selectPlayers')}>
                    <Text style={Style.addPlayersButton}>Add Players</Text>
                </TouchableOpacity>
            </View>

            {/**
             * Game Score Container.
             */}
            <Text style={Style.text1}>
                Game Scores
            </Text>
            <View style={Style.groupContainer}>
                <View style={Style.row}>
                    <Text style={Style.label}>Total</Text>
                    <TextInput keyboardType='numeric' 
                        value={totalGameScore}
                        onChangeText={setTotalGameScore}
                     style={Style.textInput} />
                </View>

                <View style={Style.row}>
                    <Text style={Style.label}>Drop</Text>
                    <TextInput keyboardType='numeric' 
                        value={dropScore}
                        onChangeText={setDropScore}
                    style={Style.textInput} />
                </View>

                <View style={Style.row}>
                    <Text style={Style.label}>Middle Drop</Text>
                    <TextInput keyboardType='numeric' 
                        value={middleDropScore}
                        onChangeText={setMiddleDropScore}
                    style={Style.textInput} />
                </View>

                <View style={Style.row}>
                    <Text style={Style.label}>Full Count</Text>
                    <TextInput keyboardType='numeric'
                        value={fullCountScore}
                        onChangeText={setFullCountScore}
                    style={Style.textInput} />
                </View>
            </View>
            {
            /**
             * Total Game Amount Container.
             */
            }
            <Text style={Style.text1}>Total Game Amount</Text>
            <View style={Style.totalGameAmountContainer}>
                <TextInput keyboardType='numeric'
                    value={totalGameAmount}
                    onChangeText={setTotalGameAmount}
                style={Style.gameAmountText}/>
            </View>
            {/**
             * Start Game Container.
             */}
            <View>
                <TouchableOpacity onPress={()=>handleBtn()}>
                    <Text style={Style.startGameButton}>Start Game</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default StartGame
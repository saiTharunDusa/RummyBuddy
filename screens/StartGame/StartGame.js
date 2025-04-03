import { TouchableOpacity, SafeAreaView, Text, View, TextInput } from 'react-native'
import Style from './Style'
import BackButton from '../../components/BackButton/BackButton'
import { useState } from 'react'
const StartGame = ({navigation}) => {

    const [totalScore, setTotalScore] = useState('100');
    const [dropScore, setDropScore] = useState('25');
    const [middleDropScore, setMiddleDropScore] = useState('40');
    const [fullCountScore, setFullCountScore] = useState('80');
    const [totalGameAmount, setTotalGameAmount] = useState('');




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
                        value={totalScore}
                        onChangeText={setTotalScore}
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
                <TouchableOpacity>
                    <Text style={Style.startGameButton}>Start Game</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default StartGame
import React, { useEffect } from "react";
import { faPersonCirclePlus, faPlus, faPlay, faPause, faCheck, faash } from '@fortawesome/free-solid-svg-icons';
import { View } from 'react-native'; // Add View import
import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import { SafeAreaView } from "react-native-safe-area-context";
import { Routes } from "../../navigation/Routes";
import { useDispatch } from "react-redux";
import { resetAllSelectedPlayers } from "../../redux/reducers/selectedPlayers";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setPlayers } from "../../redux/reducers/allPlayers";
import { verticalScale } from "../../assets/Scaling";

const Home = ({navigation}) => {

    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async (user) => {
          if (user) {
            await fetchPlayers(user.uid);
          }
        });
    
        return () => unsubscribe();
    }, []);
    
    const fetchPlayers = async (userId) => {
        try {
          const snapshot = await firestore()
            .collection('users')
            .doc(userId)
            .collection('allPlayers')
            .get();
    
          const allPlayers = snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
          }));
    
          dispatch(setPlayers(allPlayers));
        } catch (err) {
          console.log('ERROR', err);
        }
    };
    
    return (
        <SafeAreaView style={{
            flex: 1,
            width: '100%',
        }}>
            <Title />
            
            <View style={{
                flex: 1, 
                justifyContent: 'space-evenly', 
            }}>
                <Button
                    icon={faPersonCirclePlus}
                    text="All Players"
                    onPress={() => {
                        navigation.navigate(Routes.AllPlayers);
                    }}
                />
                <Button
                    icon={faPlus}
                    text={"New Game"}
                    onPress={() => {
                        dispatch(resetAllSelectedPlayers())
                        navigation.navigate(Routes.StartGame)
                    }}
                />
                <Button
                    icon={faPlay}
                    text={"Continue Game"}
                    onPress={() => {
                        navigation.navigate(Routes.ContinueGame)
                    }}
                />
                <Button
                    icon={faCheck}
                    text={"Completed Games"}
                    onPress={() => {
                        navigation.navigate(Routes.CompletedGames)
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Home;
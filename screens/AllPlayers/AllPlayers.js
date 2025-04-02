import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { addPlayer, removePlayer, setPlayers, editPlayer } from '../../redux/reducers/allPlayers';
import Style from './Style';



const AllPlayers = () => {

    const [playerName, setPlayerName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');
    

    const dispatch = useDispatch();
    const playersData = useSelector((store) => store.allPlayers.list)
    

    useEffect(() => {
        const fetchPlayers = async () =>{
            try{
                const snapshot = await firestore().collection('players').get();
                const allPlayers = snapshot.docs.map(doc=>({
                id: doc.id,
                name: doc.data().name
            }));
            dispatch(setPlayers(allPlayers));
            }
            catch(err)
            {
                console.log("ERROR" + err);
            }
            
        }
        fetchPlayers();
    }, []);

    const handleAddPlayer = async () => {
        try {
          if (!playerName || !playerName.trim()) return;
      
          const playersRef = firestore().collection('players');
      
          // Check for duplicates (case-insensitive)
          const snapshot = await playersRef
            .where('name', '==', playerName.trim())
            .get();
      
          if (!snapshot.empty) {
            console.log('Player with this name already exists.');
            return;
          }
      
          // If not found, add new player
          const newDoc = await playersRef.add({ name: playerName.trim() });
          dispatch(addPlayer({id : newDoc.id, name : playerName.trim()}))
          setPlayerName('');
          console.log('Player added successfully!');
        } catch (err) {
          console.log('Error: ' + err);
        }
    };
      
    const handleRemovePlayer = async ({id}) => {
        try{
            await firestore().collection('players').doc(id).delete();
            dispatch(removePlayer(id));
            await fetchPlayers();
        }
        catch(err)
        {
            console.log("ERROR" + err);
        }
        
    }

    const handleEditPlayer = async () => {
        try{
            await firestore().collection('players').doc(editingId).update({
                name : editingName
            })
            dispatch(editPlayer({id : editingId, newName : editingName}))
            setEditingId(null);
            setEditingName('');
        }
        catch(err)
        {
            console.log("ERROR: " + err);
        }
        
    }
     
      
    const renderItem = ({ item }) => {
        const isEditing = editingId === item.id;
    
        return (
          <View style={Style.playerItem}>
            {isEditing ? (
              <>
                <TextInput
                  style={Style.editInput}
                  value={editingName}
                  onChangeText={setEditingName}
                />
                <TouchableOpacity style={[Style.button, Style.saveButton]} onPress={handleEditPlayer}>
                  <Text style={Style.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Style.button, Style.cancelButton]} onPress={() => setEditingId(null)}>
                  <Text style={Style.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={Style.playerName}>{item.name}</Text>
                <TouchableOpacity
                  style={[Style.button, Style.editButton]}
                  onPress={() => {
                    setEditingId(item.id);
                    setEditingName(item.name);
                  }}
                >
                  <Text style={Style.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[Style.button, Style.removeButton]}
                  onPress={() => handleRemovePlayer({id : item.id})}
                >
                  <Text style={Style.buttonText}>Remove</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        );
      };
    
      return (
        <SafeAreaView style={Style.container}>
          <View style={Style.inputContainer}>
            <TextInput
              placeholder="Enter player's name"
              value={playerName}
              onChangeText={setPlayerName}
              style={Style.textInput}
            />
            <TouchableOpacity style={Style.button} onPress={handleAddPlayer}>
              <Text style={Style.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
    
          <FlatList
          showsVerticalScrollIndicator={false}
            data={playersData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </SafeAreaView>
      );
    };
    
    export default AllPlayers;
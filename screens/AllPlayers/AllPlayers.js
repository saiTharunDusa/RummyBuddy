import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { addPlayer, removePlayer, editPlayer } from '../../redux/reducers/allPlayers';
import Style from './Style';
import BackButton from '../../components/BackButton/BackButton';
import { InteractionManager } from 'react-native';


const AllPlayers = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const dispatch = useDispatch();
  const playersData = useSelector((store) => store.allPlayers.list);

  const handleAddPlayer = () => {
    if (!playerName.trim()) return;

    // Avoid duplicate names
    if (playersData.some(player => player.name === playerName.trim())) {
      console.log('Player already exists');
      return;
    }

    const tempId = Date.now().toString(); // temporary ID
    dispatch(addPlayer({ id: tempId, name: playerName.trim() }));
    setPlayerName('');
  };

  const handleRemovePlayer = (id) => {
    dispatch(removePlayer(id));
  };

  const handleEditPlayer = () => {
    if (!editingId || !editingName.trim()) return;
    dispatch(editPlayer({ id: editingId, newName: editingName.trim() }));
    setEditingId(null);
    setEditingName('');
  };


const handleBackBtn = () => {
  const userId = auth().currentUser?.uid;
  if (!userId) return;

  navigation.goBack();

  InteractionManager.runAfterInteractions(async () => {
    try {
      const playersRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('allPlayers');

      const existingDocs = await playersRef.get();
      const deleteBatch = firestore().batch();
      existingDocs.forEach((doc) => deleteBatch.delete(doc.ref));
      await deleteBatch.commit();

      const addBatch = firestore().batch();
      playersData.forEach((player) => {
        const newRef = playersRef.doc();
        addBatch.set(newRef, { name: player.name });
      });
      await addBatch.commit();
    } catch (err) {
      console.log('Error while saving players:', err);
    }
  });
};


  const renderItem = useCallback(({ item }) => {
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
            <TouchableOpacity
              style={[Style.button, Style.saveButton]}
              onPress={handleEditPlayer}
            >
              <Text style={Style.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Style.button, Style.cancelButton]}
              onPress={() => setEditingId(null)}
            >
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
              onPress={() => handleRemovePlayer(item.id)}
            >
              <Text style={Style.buttonText}>Remove</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }, [editingId, editingName]);

  return (
    <SafeAreaView style={Style.container}>
      <View>
        <BackButton onPress={handleBackBtn} />
      </View>
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

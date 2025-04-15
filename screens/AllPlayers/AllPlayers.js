import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  InteractionManager,
  BackHandler,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import {
  addPlayer,
  removePlayer,
  editPlayer,
  setPlayers,
  setLastVisible,
  setIsEndReached,
} from '../../redux/reducers/allPlayers';
import Style from './Style';
import BackButton from '../../components/BackButton/BackButton';

const AllPlayers = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const dispatch = useDispatch();
  const playersData = useSelector((store) => store.allPlayers.list);
  const lastVisible = useSelector((store) => store.allPlayers.lastVisible);
  const isEndReached = useSelector((store) => store.allPlayers.isEndReached);

  const fetchInitialPlayers = async () => {
    const userId = auth().currentUser?.uid;
    if (!userId) return;
    try {
      const snapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('allPlayers')
        .orderBy('name')
        .limit(11)
        .get();

      const players = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch(setPlayers(players));
      dispatch(setLastVisible(snapshot.docs[snapshot.docs.length - 1]));
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  const fetchMorePlayers = async () => {
    if (!lastVisible || loadingMore || isEndReached) return;
    try {
      setLoadingMore(true);
      const userId = auth().currentUser?.uid;
      const snapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('allPlayers')
        .orderBy('name')
        .startAfter(lastVisible)
        .limit(11)
        .get();

      const newPlayers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (newPlayers.length < 11) dispatch(setIsEndReached(true));

      dispatch(setPlayers([...playersData, ...newPlayers]));
      dispatch(setLastVisible(snapshot.docs[snapshot.docs.length - 1]));
      setLoadingMore(false);
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  useEffect(() => {
    if (playersData.length === 0) fetchInitialPlayers();
  }, []);

  const handleAddPlayer = () => {
    if (!playerName.trim()) return;
    if (playersData.some(player => player.name === playerName.trim())) return;
    const newPlayer = { id: Date.now().toString(), name: playerName.trim() };
    dispatch(addPlayer(newPlayer));
    setPlayerName('');
    setIsDirty(true);
  };

  const handleRemovePlayer = (id) => {
    dispatch(removePlayer(id));
    setIsDirty(true);
  };

  const handleEditPlayer = () => {
    if (!editingId || !editingName.trim()) return;
    dispatch(editPlayer({ id: editingId, newName: editingName.trim() }));
    setEditingId(null);
    setEditingName('');
    setIsDirty(true);
  };

  const savePlayersToFirestore = async () => {
    if (!isDirty) return;
    const userId = auth().currentUser?.uid;
    if (!userId) return;
    try {
      console.log("async call triggered!");
      const playersRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('allPlayers');

      const existingDocs = await playersRef.get();
      const deleteBatch = firestore().batch();
      existingDocs.forEach(doc => deleteBatch.delete(doc.ref));
      await deleteBatch.commit();

      const addBatch = firestore().batch();
      playersData.forEach(player => {
        const newRef = playersRef.doc();
        addBatch.set(newRef, { name: player.name });
      });
      await addBatch.commit();
    } catch (err) {
      console.log('Error while saving players:', err);
    }
  };

  const handleBackBtn = () => {
    if (!isDirty) {
      navigation.goBack();
      return;
    }

    InteractionManager.runAfterInteractions(async () => {
      await savePlayersToFirestore();
      navigation.goBack();
    });
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleBackBtn();
        return true;
      };
  
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [isDirty, playersData])
  );
  

  useEffect(() => {
    return () => {
      if (isDirty) {
        InteractionManager.runAfterInteractions(() => savePlayersToFirestore());
      }
    };
  }, [isDirty, playersData]);

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
        onEndReached={fetchMorePlayers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#000" /> : null}
      />
    </SafeAreaView>
  );
};

export default AllPlayers;

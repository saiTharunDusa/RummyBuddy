import React, { useCallback } from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlayer } from '../../redux/reducers/selectedPlayers';
import Style from './Style';
import BackButton from '../../components/BackButton/BackButton';

const SelectPlayers = ({ navigation }) => {
  const allPlayers = useSelector((store) => store.allPlayers.list);
  const selectedPlayers = useSelector((store) => store.selectedPlayers.list);
  const dispatch = useDispatch();

  const toggleSelect = (player) => {
    const exists = selectedPlayers.find((p) => p.id === player.id);
    let updated;
    if (exists) {
      updated = selectedPlayers.filter((p) => p.id !== player.id);
    } else {
      updated = [...selectedPlayers, player];
    }
    dispatch(selectPlayer(updated));
  };

  const handleConfirm = () => {
    navigation.goBack(); 
  };

  const renderItem = useCallback(({ item }) => {
    const index = selectedPlayers.findIndex((p) => p.id === item.id);
    const isSelected = index !== -1;

    return (
      <TouchableOpacity
        style={Style.playerItem}
        onPress={() => toggleSelect(item)}
      >
        <Text style={Style.playerName}>{item.name}</Text>
        <View style={[Style.checkbox, isSelected && Style.checkboxSelected]}>
          {isSelected && <Text style={Style.orderText}>{index + 1}</Text>}
        </View>
      </TouchableOpacity>
    );
  }, [selectedPlayers]);

  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.headerRow}>
        <View style={Style.back}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <Text style={Style.title}>Select Players In Order!</Text>
      </View>

      <FlatList
        data={allPlayers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      <TouchableOpacity
        style={Style.button}
        onPress={handleConfirm}
        disabled={selectedPlayers.length < 2}
      >
        <Text style={Style.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SelectPlayers;

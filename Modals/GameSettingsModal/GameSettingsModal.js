import {React, useEffect, useState} from "react";
import { SafeAreaView, TouchableOpacity, Modal, View, Text} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Routes } from "../../navigation/Routes";
import { useNavigation } from "@react-navigation/native";
import Style from "./Style";

const GameSettingModal = () => {

    const dropScore = useSelector((store) => store.gameState.drop);
    const fullCountScore = useSelector((store) => store.gameState.fullCount);
    const totalGameScore = useSelector((store) => store.gameState.totalGameScore);
    const totalGameAmount = useSelector((store) => store.gameState.totalGameAmount);
    const middleDropScore = useSelector((store) => store.gameState.middleDrop);

    const navigation = useNavigation();
    const [showSettings, setShowSettings] = useState(false);

    

    return (
        <SafeAreaView>
            <TouchableOpacity style={Style.fab} onPress={() => setShowSettings(true)}>
                <FontAwesomeIcon icon={faGear} size={20} color="#fff" />
            </TouchableOpacity>
             {/* Game Settings */}
            <Modal visible={showSettings} transparent animationType="fade">
                <View style={Style.modalBackground}>
                <View style={Style.modalBox}>
                    <Text style={Style.modalTitle}>Game Settings</Text>
                    {[
                    { label: 'Drop', value: dropScore },
                    { label: 'Middle Drop', value: middleDropScore },
                    { label: 'Full Count', value: fullCountScore },
                    { label: 'Game Score', value: totalGameScore },
                    { label: 'Total Amount', value: totalGameAmount },
                    ].map((item, index) => (
                    <View key={index} style={Style.settingsRow}>
                        <Text style={Style.settingsLabel}>{item.label}</Text>
                        <Text style={Style.settingsValue}>{item.value}</Text>
                    </View>
                    ))}
                    <TouchableOpacity style={Style.modalClose} onPress={() => setShowSettings(false)}>
                        <Text style={{ color: '#fff' }}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.modalClose} onPress={() =>
                    {
                        navigation.navigate(Routes.Compromise),
                        setShowSettings(false)
                    } }>
                    <Text style={{ color: '#fff' }}>Compromise</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default GameSettingModal;
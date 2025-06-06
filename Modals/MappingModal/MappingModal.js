import {React, useEffect, useState} from "react";
import { SafeAreaView, Modal, View, Text, TouchableOpacity } from "react-native";
import Style from "./Style";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { scaleFontSize } from "../../assets/Scaling";


const MappingModal = () => {

    const [showMapping, setShowMapping] = useState(false);
    const inGamePlayers = useSelector((store) => store.gameState.players || []);

   
    return(
        <SafeAreaView>
            <TouchableOpacity style={Style.fab} onPress={() => setShowMapping(true)}>
                <FontAwesomeIcon icon={faUsers} size={20} color="#fff" />
            </TouchableOpacity>
            {/* Mapping Modal */}
            <Modal visible={showMapping} transparent animationType="fade">
                <View style={Style.modalBackground}>
                <View style={Style.modalBox}>
                    <Text style={Style.modalTitle}>Player Mapping</Text>
                    {inGamePlayers.map((p, index) => (
                        <Text key={p.id} style={Style.mappingText}>
                            {index + 1} → {p.name}
                        </Text>
                        ))
                    }
                    <TouchableOpacity style={Style.modalClose} onPress={() => setShowMapping(false)}>
                        <Text
                        adjustsFontSizeToFit
                        numberOfLines={1}
                        style={{ color: '#fff', fontSize : scaleFontSize(20), }}>Close</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default MappingModal;

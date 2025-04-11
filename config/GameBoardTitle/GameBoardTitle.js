import {React, useState} from "react";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import { useGoToHome } from "../../navigation/GoToHome";
import Style from "./Style";
import BackButton from "../../components/BackButton/BackButton";

const GameBoardTitle = () => {
    const goToHome = useGoToHome();
    const [showInfo, setShowInfo] = useState(false);
    return(
        <SafeAreaView>
        {/* Title and Game Info Toggle */}
        <View style={{ paddingHorizontal: 16, paddingTop: 10, marginBottom : 5 }}>
                {/* Top Row: Back + Title */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ position: 'absolute', left: 0 }}>
                        <BackButton onPress={goToHome} />
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
                    🟧 – Tells that the player has no drops left.{"\n"}
                    🔴 – Tells that the player is out of the game.{"\n"}
                    🔷 – Reentry round.
                    
                    
                    </Text>
                </View>
                )}
            </View>
    </SafeAreaView>
    )
}

export default GameBoardTitle;
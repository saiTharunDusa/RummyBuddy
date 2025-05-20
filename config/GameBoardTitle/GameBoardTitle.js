import { React, useState } from "react";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import { useGoToHome } from "../../navigation/GoToHome";
import BackButton from "../../components/BackButton/BackButton";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useSelector } from "react-redux";
import { scaleFontSize, horizontalScale, verticalScale } from "../../assets/Scaling";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Style from "./Style";

const GameBoardTitle = () => {
  const goToHome = useGoToHome();
  const [showInfo, setShowInfo] = useState(false);
  const gameState = useSelector((store) => store.gameState);
  const gameId = gameState.gameId;
  const userId = auth().currentUser?.uid;

  const handleBackPress = async () => {
    try {
      const roundsRef = firestore()
        .collection("users")
        .doc(userId)
        .collection("games")
        .doc(gameId)
        .collection("rounds");

      const batch = firestore().batch();
      gameState.rounds.forEach((round, index) => {
        const docRef = roundsRef.doc(index.toString());
        batch.set(docRef, {
          ...round,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      });

      await batch.commit();

      await firestore()
        .collection("users")
        .doc(userId)
        .collection("games")
        .doc(gameId)
        .update({
          ...gameState,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (err) {
      console.log("ERROR:", err);
    }
    goToHome();
  };

  return (<SafeAreaView>
    <View
      style={{
        paddingHorizontal: horizontalScale(16),
        paddingTop: verticalScale(10),
        marginBottom: 5,
      }}
    >
      {/* Header Row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Back Button */}
        <View style={{ width: horizontalScale(40) }}>
          <BackButton onPress={handleBackPress} />
        </View>
  
        {/* Title and ShowInfo vertically stacked */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              paddingTop : verticalScale(20),
              marginLeft : horizontalScale(15),
              color: "#3498db",
              fontSize: scaleFontSize(28),
              fontWeight: "bold",
              textAlign: "center",
              textAlignVertical: "center",
              includeFontPadding: false,
            }}
          >
            Rummy Scoreboard
          </Text>
  
          <TouchableOpacity
            style={{
              backgroundColor: "#3498db",
              paddingVertical: verticalScale(4),
              paddingHorizontal: horizontalScale(12),
              borderRadius: 6,
              marginTop: verticalScale(4),
            }}
            onPress={() => setShowInfo(!showInfo)}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {showInfo ? "Hide ScoreBoard Info ▲" : "Show ScoreBoard Info ▼"}
            </Text>
          </TouchableOpacity>
        </View>
  
        {/* Right Spacer */}
        <View style={{ width: 40 }} />
      </View>
    </View>
  
    {/* Game Info Panel */}
    {showInfo && (
  <View
    style={{
      backgroundColor: "#F0F8FF",
      marginTop: 1,
      padding: 12,
      borderRadius: 10,
    }}
  >
    <View style={{
      flexDirection : 'row',
      justifyContent : 'space-evenly',
      margin : verticalScale(5),
    }}>
      <Text style={Style.smallButton1}>D-Drop</Text>
      <Text style={Style.smallButton2}>MD-MiddleDrop</Text>
      <Text style={Style.smallButton3}>FC-FullCount</Text>
      <Text style={Style.smallButton4}>Out</Text>
    </View>
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
      <FontAwesomeIcon icon={faCircle} size={10} color="#ff8f00" style={{ marginRight: 8 }} />
      <View style={{ flex: 1 }}>
        <Text adjustsFontSizeToFit numberOfLines={1} ellipsizeMode="tail" style={{ color: "#000" }}>
          Tells that the player has no drops left.
        </Text>
      </View>
    </View>

    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
      <FontAwesomeIcon icon={faCircle} size={10} color="#ff0505" style={{ marginRight: 8 }} />
      <View style={{ flex: 1 }}>
        <Text adjustsFontSizeToFit numberOfLines={1} ellipsizeMode="tail" style={{ color: "#000" }}>
          Tells that the player is out of the game.
        </Text>
      </View>
    </View>

    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
      <FontAwesomeIcon icon={faCircle} size={10} color="#008000" style={{ marginRight: 8 }} />
      <View style={{ flex: 1 }}>
        <Text adjustsFontSizeToFit numberOfLines={1} ellipsizeMode="tail" style={{ color: "#000" }}>
          Tells that the player has re-entered.
        </Text>
      </View>
    </View>

    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
      <FontAwesomeIcon icon={faCircle} size={10} color="#B3E5FC" style={{ marginRight: 8 }} />
      <View style={{ flex: 1 }}>
        <Text adjustsFontSizeToFit numberOfLines={1} ellipsizeMode="tail" style={{ color: "#000" }}>
          Re-entry round.
        </Text>
      </View>
    </View>

    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <FontAwesomeIcon icon={faCircle} size={10} color="#E1D5FF" style={{ marginRight: 8 }} />
      <View style={{ flex: 1 }}>
        <Text adjustsFontSizeToFit numberOfLines={1} ellipsizeMode="tail" style={{ color: "#000" }}>
          Total Row.
        </Text>
      </View>
    </View>
    
    
  </View>
)}


  </SafeAreaView>
  
  );
};

export default GameBoardTitle;

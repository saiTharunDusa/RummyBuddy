import AllPlayers from "../screens/AllPlayers/AllPlayers";
import ContinueGame from "../screens/ContinueGame/ContinueGame";
import GameBoard from "../screens/GameBoard/GameBoard";
import Home from "../screens/Home/Home";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import SelectPlayers from "../screens/selectPlayers/SelectPlayers";
import StartGame from "../screens/StartGame/StartGame";
import { Routes } from "./Routes";
import { createStackNavigator } from "@react-navigation/stack";
import CompletedGames from "../screens/CompletedGames/CompletedGames";
import Compromise from "../screens/Compromise/Compromise"
import GameBoardTemp from "../screens/GameBoard/GameBoardTemp";
const Stack = createStackNavigator();


export const NonAuthenticated = () => {
    return (
        <Stack.Navigator initialRouteName={Routes.Login} screenOptions={{header : () => null, headerShown : false}}>
            <Stack.Screen name={Routes.Login} component={Login} />
            <Stack.Screen name={Routes.Register} component={Register} />
        </Stack.Navigator>
    )
}

export const Authenticated = () => {
    return(
        <Stack.Navigator initialRouteName={Routes.Home} screenOptions={{header : () => null, headerShown : false}}>
            <Stack.Screen name={Routes.Home} component={Home} />
            <Stack.Screen name={Routes.AllPlayers} component={AllPlayers}/>
            <Stack.Screen name={Routes.StartGame} component={StartGame}/>
            <Stack.Screen name={Routes.selectPlayers} component={SelectPlayers} />
            <Stack.Screen name={Routes.GameBoardTemp} component={GameBoardTemp}/>
            <Stack.Screen name={Routes.ContinueGame} component={ContinueGame} />
            <Stack.Screen name={Routes.CompletedGames} component={CompletedGames}  />
            <Stack.Screen name={Routes.Compromise} component={Compromise} />
        </Stack.Navigator>
    )
}


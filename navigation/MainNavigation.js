import AllPlayers from "../screens/AllPlayers/AllPlayers";
import Home from "../screens/Home/Home";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import SelectPlayers from "../screens/selectPlayers/SelectPlayers";
import StartGame from "../screens/StartGame/StartGame";
import { Routes } from "./Routes";
import { createStackNavigator } from "@react-navigation/stack";

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
        </Stack.Navigator>
    )
}


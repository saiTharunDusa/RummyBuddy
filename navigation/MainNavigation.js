import AllPlayers from "../screens/AllPlayers/AllPlayers";
import Home from "../screens/Home/Home";
import { Routes } from "./Routes";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const MainNavigation = () => {
    return(
        <Stack.Navigator initialRouteName={Routes.Home} 
        screenOptions={{header: () => null, headerShown: false}}>
            <Stack.Screen name={Routes.Home} component={Home} />
            <Stack.Screen name={Routes.AllPlayers} component={AllPlayers}/>
        </Stack.Navigator>
    )
}
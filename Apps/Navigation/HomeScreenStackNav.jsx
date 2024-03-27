import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import ItemList from "../Screens/ItemList";

const Stack = createStackNavigator();
const HomeScreenStackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="item-list"
                component={ItemList}
                options={({ route }) => ({ title: route.params.category, headerBackground: 'green', headerTintColor: 'white' })}
               
            />
        </Stack.Navigator>
    );
};

export default HomeScreenStackNav;

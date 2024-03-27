import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import ExploreScreen from "../Screens/ExploreScreen";
import AddPostScreen from "../Screens/AddPostScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import HomeScreenStackNav from "./HomeScreenStackNav";

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
   return (
       <Tab.Navigator screenOptions={{
           headerShown: false, tabBarActiveTintColor: "#00635D" }}>
         <Tab.Screen
            name="All Goods "
            component={HomeScreenStackNav}
            options={{
               tabBarLabel: ({ color }) => (
                  <Text style={{ color: color, fontSize: 12, fontWeight: 600 }}>
                     HOME
                  </Text>
               ),
               tabBarIcon: ({ color, size }) => (
                  <AntDesign name="home" size={size} color={color} />
               ),
            }}
         />
         <Tab.Screen name="Explore" component={ExploreScreen}  options={{
               tabBarLabel: ({ color }) => (
                  <Text style={{ color: color, fontSize: 12, fontWeight: 600 }}>
                     Explore
                  </Text>
               ),
               tabBarIcon: ({ color, size }) => (
                   <MaterialIcons name="manage-search" size={size} color={color} />
               ),
            }}/>
         <Tab.Screen name="Add post" component={AddPostScreen}  options={{
               tabBarLabel: ({ color }) => (
                  <Text style={{ color: color, fontSize: 12, fontWeight: 600 }}>
                     Add post
                  </Text>
               ),
               tabBarIcon: ({ color, size }) => (
                   <Ionicons name="camera-outline" size={size} color={color} />
               ),
            }}/>
         <Tab.Screen name="Profile" component={ProfileScreen}  options={{
               tabBarLabel: ({ color }) => (
                  <Text style={{ color: color, fontSize: 12, fontWeight: 600 }}>
                     Profile
                  </Text>
               ),
               tabBarIcon: ({ color, size }) => (
                   <SimpleLineIcons name="user" size={size} color={color} />
               ),
            }}/>
      </Tab.Navigator>
   );
}

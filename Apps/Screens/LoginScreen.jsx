import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hook/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
   useWarmUpBrowser();
   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

   const onPress = React.useCallback(async () => {
      try {
         const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
         if (createdSessionId) {
            setActive({ session: createdSessionId });
         } else {         
         }
      } catch (err) {
         console.error("OAuth error", err);
      }
   }, []);

   return (
      <View>
         <Image
            source={require("../../assets/images/wel.png")}
            className="w-full object-contain h-[400px] mt-12"
         />
         <View className="px-8 mt-16 rounded-t-3xl shadow-inner ">
            <Text className="text-green-500 font-bold text-center text-4xl">
               FastTrack Market
            </Text>
            <Text className=" text-gray-500 font-bold text-center text-lg">
               "Welcome to our FastTrack app – your gateway to endless
               discoveries. Start exploring now and let the shopping adventure
               begin!"
            </Text>

            <TouchableOpacity
               className="mx-auto mt-7 rounded-lg px-8 py-4 bg-[#00635D]"
               onPress={onPress}
            >
               <Text className="font-bold text-white text-base">
                  Get Shopping
               </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}

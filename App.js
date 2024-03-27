import { StatusBar } from 'expo-status-bar';
import { Text, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Apps/Navigation/TabNavigation';


export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_aGVscGZ1bC1waWctNDYuY2xlcmsuYWNjb3VudHMuZGV2JA'>

      <SafeAreaView className="flex-1 bg-white" >
        <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ClerkProvider>
  );
}



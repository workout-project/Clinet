import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Signup from './Components/Signup';
import { UserContextProvider } from './context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Navigator/StackNavigator.js';
import { DetailsContextProvider } from './context/DetailContext';


export default function App() {

  return (
    <UserContextProvider>
      <DetailsContextProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </DetailsContextProvider>
    </UserContextProvider >
  );
}

const styles = StyleSheet.create({

});

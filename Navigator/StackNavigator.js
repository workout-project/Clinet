import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Components/Home'
import Signup from '../Components/Signup'
import Login from '../Components/Login'
import { useUserContext } from '../Hooks/UseUserContext'
import Profile from '../Components/Profile'
import PTProfile from '../Components/PTProfile'
import EditProfile from '../Components/EditProfile'
import SignupPt from '../Components/SignupPt'
import ForgotPassword from '../Components/ForgotPassword'

const Stack = createNativeStackNavigator() 

const StackNavigator = () => {
    const {user} = useUserContext()
  return (
          <Stack.Navigator screenOptions={{headerShown : true}}>
              <Stack.Group>
                <Stack.Screen name='Home' component={Home} />
                {!user && <Stack.Screen name='Signup' component={!user ? Signup: Home } /> }
        {!user && <Stack.Screen name='Login' component={!user ? Login : Home} />}
        {!user && <Stack.Screen name='Forgot password' component={!user ? ForgotPassword : Home} />}
        {/*  */}
        {!user && <Stack.Screen name='Signup PT' component={!user ? SignupPt : Home} />}
                <Stack.Screen name='User Profile' component={Profile}/>
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}} >
        <Stack.Screen name='Personal Trainer' component={PTProfile} />
        <Stack.Screen name='Profile Edit' component={EditProfile} />
      </Stack.Group>
          </Stack.Navigator> 
  )
}
export default StackNavigator
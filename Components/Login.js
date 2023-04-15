import { View, Text, TextInput, TouchableOpacity, StyleSheet,Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogin } from '../Hooks/UseLogin';
import { useNavigation } from '@react-navigation/native';

const Login = ()=> {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  const { login, isLoading, error } = useLogin();
  const navigation =  useNavigation()
    // console.log('error',error)

    const submitHandler = async (e) => {
        e.preventDefault()
        await login(email,password)
    }
    
  return (
    <SafeAreaView>
          <Text >Log in:</Text>
          <TextInput placeholder='Email' label="Email" style={styles.nameBox} onChangeText={(email) => setEmail(email)} />
          <TextInput placeholder='Password' label="Password" style={styles.nameBox} onChangeText={(password) => setPassword(password)} />
      <Button onPress={submitHandler} disabled={isLoading} title='login' />
      <Button onPress={() => navigation.navigate('Forgot password')} title='Forgot your password?'/>
          
          <SafeAreaView><Text>{error && <Text >{error}</Text>}</Text></SafeAreaView>
          
          
          
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    title: {

    },
    nameBox: {
        height: 40,
        borderColor: 'gray',
      borderWidth: 1
    }
})

export default Login
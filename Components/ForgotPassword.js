import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'


const ForgotPassword = () => {
  const [email, setEmail] = useState()
  const navigation =  useNavigation()
  
  const submitHandler = async (e) => {
    e.preventDefault()
   
    try {
      const res = await axios.post('http://localhost:8080/forgotPassword', { email })
      navigation.navigate('Login')
      throw alert('Please check your email!')

    } catch (error) {
      console.log(error)
    }

  }
  return (
    <SafeAreaProvider>
      <Text>Enter your email:</Text>
      <TextInput placeholder='Email' label="Email" style={styles.nameBox} onChangeText={(email) => setEmail(email)} />
      <Button onPress={submitHandler} title='Submit'/> 

    </SafeAreaProvider>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  nameBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})
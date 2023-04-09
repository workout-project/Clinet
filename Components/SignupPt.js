
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import  { useState } from 'react'

import { useNavigation } from '@react-navigation/native'

const SignupPt = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const { signup, isLoading, error } = useSignup();
    const navigation = useNavigation()

    const submitHandler = async (e) => {
        e.preventDefault();
        await signup(firstName, lastName, email, password)
    }

  return (
      <SafeAreaProvider>
          <Text style={styles.title}>Sign up:</Text>
          <TextInput placeholder='First Name' label="First Name" style={styles.nameBox} onChangeText={(firstName) => setFirstName(firstName)} />
          <TextInput placeholder='Last Name' label="Last Name" style={styles.nameBox} onChangeText={(lastName) => setFirstName(lastName)} />
          <TextInput placeholder='Email' label="Email" style={styles.nameBox} onChangeText={(email) => setFirstName(email)} />
          <TextInput placeholder='Password' label="Password" style={styles.nameBox} onChangeText={(password) => setFirstName(password)} />
          <Button title='Submit' onPress={submitHandler}/>
          <View>
              <Text>{error && <Text >{error}</Text>}</Text>
          </View>
          <Button onPress={() => navigation.navigate("Login")} title="already have an account? " />
    </SafeAreaProvider>
  )
}

export default SignupPt

const styles = StyleSheet.create({
    nameBox: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
})
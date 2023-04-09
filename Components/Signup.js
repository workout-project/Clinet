import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { useSignup } from '../Hooks/UseSignup'

import { useNavigation } from '@react-navigation/native'


const Signup = () => {
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

    // console.log(firstName)
    return (
        <View>
            <Text style={styles.title}>Sign up:</Text>
            <TextInput placeholder='First Name' label="First Name" style={styles.nameBox} onChangeText={(firstName) => setFirstName(firstName)} />
            <TextInput placeholder='Last Name' label="Last Name" style={styles.nameBox} onChangeText={(lastName) => setLastName(lastName)} />
            <TextInput placeholder='Email' label="Email" style={styles.nameBox} onChangeText={(email) => setEmail(email)} />
            <TextInput placeholder='Password' label="Password" style={styles.nameBox} onChangeText={(password) => setPassword(password)} />
            <TouchableOpacity onPress={submitHandler} disabled={isLoading}><Text>submit</Text></TouchableOpacity>
            <View>
                <Text>{error && <Text >{error}</Text>}</Text>
            </View>
            <Button onPress={() => navigation.navigate("Login")} title="already have an account? " />


        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    title: {

    },
    nameBox: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
})
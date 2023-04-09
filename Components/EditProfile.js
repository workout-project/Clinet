import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useUserContext } from '../Hooks/UseUserContext'
import { useLogout } from '../Hooks/UseLogout'
import SelectDropdown from 'react-native-select-dropdown'
import axios from 'axios'
import useDetailsContext from '../Hooks/UseDetailsContext.js'
import { useNavigation } from '@react-navigation/native'
const EditProfile = () => {
    const {dispatch, details} = useDetailsContext()
    const { user } = useUserContext();
    const { logout } = useLogout()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [gender, setGender] = useState()
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState()
    const [fitnessGoal, setFitnessGoal] = useState()
    const genders = ['Female', 'Male']
    const [emptyPlace, setEmptyPlace] = useState([])
    const [error, setError] = useState(null)
    const navigation =  useNavigation()

    // console.log(details.weight)
    const handleClick = () => {
        logout()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const details = { height, weight, gender, fitnessGoal,firstName,lastName }

        await axios.patch("http://localhost:8080/signup", details, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((res) => {
                dispatch({
                    type: 'CREATE_DETAILS',
                    payload: res.data[0]
                })
                navigation.navigate('Home')
            })
            .catch((error) => console.log(error))
    }
    // console.log(details && (details.weight.toString()))
    

    return (

        <SafeAreaProvider>
            <Text>UserProfile: </Text>
            <TextInput placeholder='First Name' defaultValue={user.firstName} label="First Name" style={styles.nameBox} onChangeText={(firstName)=> setFirstName(firstName)} />
            <TextInput placeholder='Last Name' defaultValue={user.lastName} label="Last Name" style={styles.nameBox} onChangeText={(lastName )=> setLastName(lastName)}/>
            <SafeAreaProvider>
                <SelectDropdown
                    data={genders}
                    defaultButtonText='Gender'
                    defaultValue={details && (details.gender)}
                    onSelect={(selectedItem, index) => setGender(selectedItem)}
                />
                <TextInput placeholder='Weight (kg)' label="Weight" style={styles.nameBox}  onChangeText={(weight) => setWeight(weight)} />
                <TextInput placeholder='Height (cm)' label="Height" style={styles.nameBox}  onChangeText={(height) => setHeight(height)} />
                <TextInput placeholder='Fitness Goal' label="Fitness Goal" style={styles.nameBox} defaultValue={details && (details.fitnessGoal)} onChangeText={(fitnessGoal) => setFitnessGoal(fitnessGoal)} />
                <Button title='update' onPress={handleSubmit} />
                {/* {user && (
                    <Button onPress={handleClick} title='Log out' />
                )} */}
            </SafeAreaProvider>

        </SafeAreaProvider>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    nameBox: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
})

// defaultValue = { details && (details.weight.toString())}
// defaultValue = { details && (details.height.toString())}
// defaultValue = { details && (details.fitnessGoal)}
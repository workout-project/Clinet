import { StyleSheet, Text, View , Button, TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useUserContext } from '../Hooks/UseUserContext'
import { useLogout } from '../Hooks/UseLogout'
import SelectDropdown from 'react-native-select-dropdown'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import useDetailsContext from '../Hooks/UseDetailsContext'
const Profile = () => {

  const {dispatch, details} = useDetailsContext()
    const { user } = useUserContext();
  const { logout } = useLogout()
  const [gender, setGender] = useState()
  const [height, setHeight] = useState()
  const [weight, setWeight] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [fitnessGoal , setFitnessGoal] = useState()
  const genders = ['Female', 'Male']
  const [emptyPlace, setEmptyPlace] = useState([])
  const [error, setError] = useState(null)
  const navigation = useNavigation()
  let userDetails = []
    
  const handleClick = () => {
      logout()
  }
    
  useEffect(() => {
    const fetchData = async () => {
      await axios.get('http://localhost:8080/signup', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
        })
        .then((res) => {
          
          dispatch({
            type: 'SET_DETAILS',
            payload: res.data[0]
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }

    if (user) {
      fetchData()
    }
    //setting the details
    
    // userDetails = details
    // setFirstName(details.firstName)
    // setLastName(details.lastName)
    // setGender(details.gender)
    // setFitnessGoal(details.fitnessGoal)
    // setWeight(details.weight)
    // setHeight(details.height)

  }, [dispatch,user])
  // console.log('details are: ', details)
  
  return (
    
    <SafeAreaProvider>
      <Text>UserProfile: </Text>
      <Text style={styles.nameBox}>First name: {details &&(details.firstName)}</Text>
      <Text style={styles.nameBox}>First name: {details && (details.lastName)}</Text>
      <Text style={styles.nameBox} >Gender : {details && (details.gender)}</Text>
      <Text style={styles.nameBox} >Weight : {details && (details.weight)} kg</Text>
      <Text style={styles.nameBox} >Height : {details && (details.height)} cm</Text>
      <Text style={styles.nameBox} >Fitness Goal : {details && (details.fitnessGoal)}</Text>
      <Button title='Edit' onPress={() => navigation.navigate('Profile Edit')} />

    </SafeAreaProvider>
  )
}

export default Profile

const styles = StyleSheet.create({
  nameBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})
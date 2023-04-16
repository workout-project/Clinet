import { View, Text, Button, TouchableOpacity } from 'react-native'
import  { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useLogout } from '../Hooks/UseLogout'
import { useUserContext } from '../Hooks/UseUserContext'
import axios from 'axios'
import PTProfile from './PTProfile'
import PTOverview from './PTOverview'
import * as Location from 'expo-location'


const Home = () => {
  const navigation = useNavigation()
  const { user } = useUserContext()
  const [list, setList] = useState([])
  const [location, setLocation] = useState('')
  const [errorMsg, setErrorMsg] = useState(null);

  
    const {logout} = useLogout()
    const handleClick =  () => {
        logout()
    }
  
  useEffect(() => {
    setTimeout(() => {
      const fetchPT = async () => {
        const getPT = await axios.get('http://localhost:8080/signupPTClient', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
          .then((res) => {
            console.log(res.data)
            setList(res.data)
          }).catch(function (err) {
            console.log(err)
          })
      }
      


      if (user) {
        fetchPT()
      }
    }, 10);
    
  }, [user])
  
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
        
      //check we have permission 
      if (status === 'granted') {
        console.log('permission granted')
      } else {
        console.log('permission not granted')
      }

      let { coords } = await Location.getCurrentPositionAsync()
      setLocation(coords)


      if (coords) {
        const { latitude, longitude } = coords
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude
        })

        // setLocation(response[0].postalCode)
      }
    }

    if (user) {
      getLocation()
    }
  },[user])

  console.log('home:', list)
  
  // let currentLocation = JSON.stringify(location);
  
  return (
    
    <SafeAreaView> 
      <Text>Home page</Text>
      {!user && (<Button onPress={() => navigation.navigate('Signup')} title='Sign up' />)}
      {!user && (<Button onPress={() => navigation.navigate('Login')} title='Log in' />)}
      {/* {!user && (<Button onPress={() => navigation.navigate('Signup PT')} title='Sign up as PT' />)} */}
      {user && (<Button onPress={handleClick} title='Log out' />)}
      {user && (<Button onPress={()=>navigation.navigate('User Profile')} title='Profile' />)}
      {user && (<TouchableOpacity onPress={() => navigation.navigate('Personal Trainer')}><Text>personal Trainer</Text></TouchableOpacity>)}
      {/* {user && (<TouchableOpacity onPress={() => navigation.navigate('Personal Trainer')}><Text><PTOverview list={list} /></Text></TouchableOpacity>)} */}
      {(location === '' && list === []) ? <Text>Loading...</Text> : <PTOverview list={list} location={location} />}
      
    </SafeAreaView>
  )
}

export default Home
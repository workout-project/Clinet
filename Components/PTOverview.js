import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import axios from 'axios'
import { useUserContext } from '../Hooks/UseUserContext'
import { useNavigation } from '@react-navigation/native'
import PTProfile from './PTProfile'




const PTOverview = ({list}) => {
    // const {firstName } = props.firstName
    // console.log('props', list.length)
    const { user } = useUserContext()
    const navigation = useNavigation()
    
    // useEffect(() => {
    //     const fetchPT = async () => {
    //         const getPT = await axios.get('http://localhost:5000/listPT')
    //             .then((res) => {
    //                 console.log(res)
    //                 setList(res.data)
    //             }).catch((err) => console.log(err))
    //     }

    //     if (user) {
    //         fetchPT()
    //     }
    // }, [])

    // console.log(list)

  return (
    <SafeAreaProvider>
          {user && (<View>
              
        {list.map((item) => <TouchableOpacity style={styles.nameBox} key={item._id} onPress={() => {
          navigation.navigate('Personal Trainer',{ PTDetail : item})}}>
          <Text>{item.firstName}
              </Text>
              </TouchableOpacity>)}
          </View>)}
          {/* {user && (<TouchableOpacity onPress={() => navigation.navigate('Personal Trainer')}><Text>personal Trainer</Text></TouchableOpacity>)} */}
          
    </SafeAreaProvider>
  )
}

export default PTOverview

const styles = StyleSheet.create({
    nameBox: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
})
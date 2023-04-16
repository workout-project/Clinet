import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useUserContext } from '../Hooks/UseUserContext'
import { useNavigation } from '@react-navigation/native'
import { postcodeConverter } from '../Hooks/postcodeConvertor'
import { getDistance, getPreciseDistance } from 'geolib';
import * as Location from 'expo-location'




const PTOverview = ({ list, location }) => {
  const { user } = useUserContext()
  const navigation = useNavigation()
  let distanceList = []
  
  const { latitude, longitude } = list[0] ?? {}
  console.log('list overview',list[0])
  // console.log(list[0].latitude, list[0].longitude)

  

  
  

 
   
  

  
  // getting distance
  const calculatePreciseDistance = (latitude,longitude) => {
    if (latitude !== undefined) {
      var distance = getPreciseDistance(
        { latitude: location.latitude, longitude: location.longitude },
        { latitude: latitude, longitude: longitude },
      );
      const finalDis = (distance * 0.00062137).toFixed(1)
      
      return finalDis
    }
    
  };

  const distance = list.map((item) => {
    const dis = calculatePreciseDistance(item.latitude, item.longitude)
  
    item.distance = dis
  })
  


  //getting closest to user 

  list.sort(function (a, b) {
    return a.distance - b.distance
  })


  const mapping = list.map((item) => <TouchableOpacity style={styles.nameBox} key={item._id} onPress={() => {
        navigation.navigate('Personal Trainer', { PTDetail: item })}}>
    <Text>{item.firstName}</Text>
    <Text>{item.distance} miles from you </Text>
      </TouchableOpacity>)

  return (
    <SafeAreaProvider>
          {/* {user && (<View>     
        {list.map((item) => <TouchableOpacity style={styles.nameBox} key={item._id} onPress={() => {
          navigation.navigate('Personal Trainer',{ PTDetail : item})}}>
          <Text>{item.firstName}</Text>
        </TouchableOpacity>)}
      </View>)} */}
      {user && (<View>
        {mapping}
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
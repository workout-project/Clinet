import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const PTProfile = ({ route }) => {
  const navigation = useNavigation()

  return (
    <SafeAreaView>
          <Text>PTProfile:</Text>
      <Text>{route.params.PTDetail.firstName} {route.params.PTDetail.lastName}</Text>
      <Text>About {route.params.PTDetail.firstName}:</Text>
      <Text>{route.params.PTDetail.about}</Text>
      
          <Button onPress={()=>navigation.goBack() } title='Done'/>
    </SafeAreaView>
  )
}

export default PTProfile

const styles = StyleSheet.create({})
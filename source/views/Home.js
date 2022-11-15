import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = ({route, navigation}) => {
  const user = route.params.usuario
  return (
    <SafeAreaView>
      <Text>{user.document.registeredAt}</Text>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})
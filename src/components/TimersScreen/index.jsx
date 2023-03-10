import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Timer from '../Timer'

const TimersScreen = () => {
  return (
    <View>
      <Text>TimersScreen</Text>
      <View>
        <Timer initialSeconds={120}/>
      </View>
    </View>
  )
}

export default TimersScreen

const styles = StyleSheet.create({})
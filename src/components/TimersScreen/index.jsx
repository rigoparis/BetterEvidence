import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SmudgeTimer from '../SmudgeTimer'

const TimersScreen = () => {
  return (
    <View style={styles.background}>
      <Text>TimersScreen</Text>
      <View>
        <SmudgeTimer />
      </View>
    </View>
  )
}

export default TimersScreen

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#2e2f31',
    paddingTop: 20,
    paddingBottom: 20,
  },
})
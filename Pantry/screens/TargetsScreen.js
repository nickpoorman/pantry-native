import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

export default class TargetsScreen extends React.Component {
  static navigationOptions = {
    title: 'Targets',
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>TODO</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
})

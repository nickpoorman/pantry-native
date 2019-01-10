import React from 'react'
import { ScrollView, StyleSheet, Text, FlatList } from 'react-native'

export default class NewTargetScreen extends React.Component {
  static navigationOptions = {
    title: 'New Target',
  }

  render() {
    const data = Array.from({ length: 200 }, (_, n) => ({ key: `row-${n}` }))
    return (
      <ScrollView style={styles.container}>
        <Text>TODO. New target screen</Text>
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

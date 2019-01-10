import React from 'react'
import { ScrollView, StyleSheet, Text, FlatList, Button } from 'react-native'

export default class TargetsScreen extends React.Component {
  static navigationOptions = {
    title: 'Targets',
  }

  render() {
    const data = Array.from({ length: 200 }, (_, n) => ({ key: `row-${n}` }))
    return (
      <ScrollView style={styles.container}>
        <Button
          title='Add A New Target'
          onPress={() => {
            /* 1. Navigate to the NewTarget route with params */
            this.props.navigation.navigate('NewTarget', {
              itemId: 86,
              otherParam: 'anything you want here',
            })
          }}
        />

        <Text>
          TODO. Put a button in here to add a new endpoint that will open a new
          window via navigation...
        </Text>

        <FlatList
          data={data}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
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

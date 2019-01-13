import React from 'react'
import { ScrollView, StyleSheet, Text, FlatList, Button } from 'react-native'
import { connect } from 'react-redux'
import { loadTargets } from 'app/store/actions'
import { targetsSelector } from 'app/store/selectors'

@connect(
  state => ({
    ui: state.ui,
    targets: targetsSelector(state),
  }),
  { loadTargets }
)
export default class TargetsScreen extends React.Component {
  static navigationOptions = {
    title: 'Targets',
  }

  // static propTypes = {
  //   targets: PropTypes.array.isRequired,
  // }

  componentDidMount() {
    console.log('Mounted TargetsScreen')
    this.props.loadTargets()
  }

  // TODO: Still need to implement pull to refresh...
  onRefresh = () => {
    this.props.loadTargets({ refreshing: true })
  }

  render() {
    const { targets } = this.props
    console.log(`targets.log: ${JSON.stringify(targets)}`)
    // const data = Array.from({ length: 10 }, (_, n) => ({ key: `row-${n}` }))
    const data = targets.map(target => ({
      ...target,
      key: target.id,
    }))
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
          renderItem={({ item }) => <Text>{`${item.name} - ${item.url}`}</Text>}
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

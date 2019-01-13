import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import { loadTargets } from 'app/store/actions'
import { targetsSelector } from 'app/store/selectors'

@connect(
  state => ({
    ui: state.ui,
    targets: targetsSelector(state),
    targetsLoading: state.targets.targetsLoading,
    targetsRefreshing: state.targets.targetsRefreshing,
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
    // TODO: We should call this loadTargets when the app opens up.
    this.props.loadTargets()
  }

  onRefresh = () => {
    this.props.loadTargets({ refreshing: true })
  }

  render() {
    const { targets, targetsLoading, targetsRefreshing } = this.props

    if (targetsLoading) {
      return <ActivityIndicator style={{ marginTop: 20 }} size='large' />
    }

    return (
      <View style={styles.container}>
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
          data={targets}
          // extraData={this.state} // trigger re-render when this changes
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Text>{`${item.name} - ${item.url}`}</Text>}
          onRefresh={this.onRefresh}
          refreshing={targetsRefreshing}
        />
      </View>
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

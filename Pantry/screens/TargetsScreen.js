import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  Platform,
  TouchableHighlight,
} from 'react-native'
import { connect } from 'react-redux'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

import { loadTargets } from 'app/store/actions'
import { targetsSelector } from 'app/store/selectors'
import { purple } from 'app/styles'
import TargetItem from 'app/components/TargetItem'
import Swipeout from 'react-native-swipeout'

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
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Targets',
      headerRight: (
        <MaterialIcons
          name='add'
          onPress={() => {
            navigation.navigate('NewTarget', {
              itemId: 86,
              otherParam: 'anything you want here',
            })
          }}
          // color={Platform.OS === 'ios' ? '#000' : null}
          size={28}
          color='#000'
          style={{ paddingRight: 8 }}
        />
      ),
    }
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

  _onPressRow = () => {
    console.log('Pressed row')
  }

  _onDeleteRow = id => {
    console.log(`Trigger delete for target: ${id}`)
    this._closeAllSwipeout()
  }

  _closeAllSwipeout = () => {
    this.setState({ openSwipeout: null })
  }

  state = {
    openSwipeout: null,
  }

  render() {
    const { targets, targetsLoading, targetsRefreshing } = this.props

    if (targetsLoading) {
      return <ActivityIndicator style={{ marginTop: 20 }} size='large' />
    }

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name='finance'
            size={80}
            color={purple}
            style={styles.icon}
          />
        </View>

        <FlatList
          data={targets}
          extraData={this.state} // trigger re-render when this changes
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Swipeout
              close={this.state.openSwipeout !== item.id}
              onOpen={() => this.setState({ openSwipeout: item.id })}
              style={styles.swipeout}
              right={[
                {
                  text: 'Delete',
                  backgroundColor: 'red',
                  onPress: () => {
                    this._onDeleteRow(item.id)
                  },
                },
              ]}
            >
              <TargetItem item={item} />
            </Swipeout>
          )}
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
    backgroundColor: '#f0f0f0',
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 5,
    marginBottom: 5,
  },
  swipeout: {
    backgroundColor: '#f0f0f0',
  },
})

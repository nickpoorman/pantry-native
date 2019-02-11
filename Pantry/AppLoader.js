import React from 'react'
import PropTypes from 'prop-types'
import { AppLoading } from 'expo'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  StatusBar,
  NetInfo,
  Platform,
  Text,
} from 'react-native'

// If we need cancel type buttons do something else instead of this
// import { ActionSheetProvider } from '@expo/react-native-action-sheet'

import { load } from 'app/store/actions/auth'
import { setConnectionStatus } from 'app/store/actions/ui'
import { purple, white, mediumPurple } from 'app/styles'
import NoConnection from 'app/components/NoConnection'
import MetriksToast from 'app/components/MetriksToast'
// import Login from './screens/Login'
import AppNavigator from './navigation/AppNavigator'

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null
  }

  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentRouteName(route)
  }
  return route.routeName
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

@connect(
  state => ({
    auth: state.auth,
    ui: state.ui,
  }),
  {
    load,
    setConnectionStatus,
  }
)
export default class AppLoader extends React.Component {
  static propTypes = {
    auth: PropTypes.shape({}).isRequired,
    load: PropTypes.func.isRequired,
    setConnectionStatus: PropTypes.func.isRequired,
    ui: PropTypes.shape({
      toast: PropTypes.shape({
        enabled: PropTypes.bool.isRequired,
      }).isRequired,
    }).isRequired,
  }

  componentDidMount() {
    this.props.load()
    NetInfo.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    )
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    )
  }

  handleFirstConnectivityChange = connectionStatus => {
    this.props.setConnectionStatus(connectionStatus.type)
  }

  render() {
    const { auth, ui } = this.props
    const user = auth.user
    const booting = auth.booting

    const loggedOut = !booting && !user
    const loggedIn = !booting && user

    const localMode = true

    if (loggedIn) {
      return (
        <View style={styles.container}>
          <Spinner visible={ui.spinner} textStyle={{ color: white }} />
          <StatusBar
            backgroundColor={Platform.OS === 'ios' ? purple : mediumPurple}
            barStyle='light-content'
          />
          {/* This is the original one that we probably want. */}
          {/* {Platform.OS === 'ios' && <StatusBar barStyle='default' />} */}

          <AppNavigator
            onNavigationStateChange={(prevState, currentState) => {
              const currentScreen = getCurrentRouteName(currentState)
              const prevScreen = getCurrentRouteName(prevState)

              if (prevScreen !== currentScreen) {
                // TODO: Add Segment
                // Expo.Segment.screen(currentScreen)
              }
            }}
          />

          {ui.toast.enabled && <MetriksToast />}

          {!localMode && ui.connectionStatus === 'none' && <NoConnection />}
        </View>
      )
    }

    if (loggedOut) {
      return (
        // TODO: Add login screen here
        // <Root>
        //   <Login />
        //   {ui.toast.enabled && <MetriksToast />}
        // </Root>
        <View
          style={{
            ...styles.container,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>TODO: Login Screen Here</Text>
          {ui.toast.enabled && <MetriksToast />}
        </View>
      )
    }

    return <AppLoading />
  }
}

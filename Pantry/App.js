import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading, Asset, Font, Icon } from 'expo'
// import Sentry from 'sentry-expo'

import deviceOrientation from 'app/lib/deviceOrientation'

import AppLoader from './AppLoader'
import AppRoot from './AppRoot'
import config from './env.json'

deviceOrientation()

// TODO: Add this in
// Sentry.enableInExpoDevelopment = false
// Sentry.config(config.SENTRY_URL).install()

// Expo.Segment.initialize({
//   androidWriteKey: 'ANDROID_WRITE_KEY_HERE',
//   iosWriteKey: 'IOS_WRITE_KEY_HERE',
// })

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    }

    return (
      <AppRoot>
        <AppLoader />
      </AppRoot>
    )
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./assets/images/piechart.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        // pacifico: require('./assets/fonts/Pacifico-Regular.ttf'),
        montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
        'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
        'montserrat-extra-bold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),

        // Roboto: require('native-base/Fonts/Roboto.ttf'),
        // Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      }),
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

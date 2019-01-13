import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, View, Text, Animated } from 'react-native'
import { isIphoneX, getBottomSpace } from 'react-native-iphone-x-helper'

import { lightGray } from 'app/styles'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 56,
    backgroundColor: lightGray,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },

  text: {
    color: '#595959',
    fontSize: 16,
  },
})

export default class NoConnection extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.spring(this.state.fadeAnim, {
      toValue: isIphoneX() ? getBottomSpace() : 49,
      duration: 2000,
    }).start()
  }

  render() {
    const { fadeAnim } = this.state

    return (
      <Animated.View style={[styles.container, { bottom: fadeAnim }]}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={styles.text}>No network connection</Text>
        </View>
      </Animated.View>
    )
  }
}

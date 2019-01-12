import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, View, Text, Animated } from 'react-native'

import { lightGray } from 'app/styles'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 52,
    paddingLeft: 16,
    backgroundColor: lightGray,
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
      toValue: 49,
      duration: 2000,
    }).start()
  }

  render() {
    const { fadeAnim } = this.state

    return (
      <Animated.View style={[styles.container, { bottom: fadeAnim }]}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.text}>No network connection</Text>
        </View>
      </Animated.View>
    )
  }
}

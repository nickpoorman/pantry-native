import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { StyleSheet, View, Text, Animated, Platform } from 'react-native'
import {
  isIphoneX,
  ifIphoneX,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'

import { white, green, red } from 'app/styles'
import { hideToast } from 'app/store/actions/toast'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    left: 0,
    backgroundColor: green,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    ...ifIphoneX(
      {
        top: -1 * getStatusBarHeight(),
        height: 64 + getStatusBarHeight(),
        paddingTop: getStatusBarHeight(),
      },
      {
        top: -64,
        height: 64,
        paddingTop: 20,
      }
    ),
  },

  text: {
    color: white,
    fontSize: 16,
    fontWeight: '500',

    ...Platform.select({
      ios: {
        marginTop: 12, // 24
      },
    }),
  },
})

@connect(
  state => ({
    ui: state.ui,
  }),
  { hideToast }
)
export default class MetriksToast extends Component {
  static propTypes = {
    ui: PropTypes.shape({
      toast: PropTypes.shape({
        alert: PropTypes.string,
        success: PropTypes.string,
      }),
    }).isRequired,

    hideToast: PropTypes.func.isRequired,

    reset: PropTypes.func,
  }

  static defaultProps = {
    alert: null,
    success: null,
    reset: null,
  }

  state = {
    slide: new Animated.Value(-64),
  }

  componentDidMount() {
    Animated.timing(this.state.slide, {
      toValue: 0,
      duration: 350,
    }).start(() => {
      this.close(() => {
        this.props.hideToast()
      })
    })
  }

  close(done) {
    setTimeout(() => {
      Animated.spring(this.state.slide, {
        toValue: -70 - (isIphoneX() ? getStatusBarHeight() : 0),
        duration: 2000,
      }).start(() => {
        setTimeout(() => {
          if (typeof this.props.reset === 'function') {
            this.props.reset()
          }
          if (typeof done === 'function') done()
        }, 500)
      })
    }, 2000)
  }

  render() {
    const { slide } = this.state
    const { alert, success } = this.props.ui.toast

    let backgroundColor = green
    let message = null

    if (alert) {
      backgroundColor = red
      message = alert
    }

    if (success) {
      backgroundColor = green
      message = success
    }

    return (
      <Animated.View
        style={[styles.container, { top: slide, backgroundColor }]}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={styles.text}>{message}</Text>
        </View>
      </Animated.View>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import configureStore from './configureStore'

const store = configureStore()

export default class AppRoot extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {}

  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

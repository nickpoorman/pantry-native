import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'

export default class TargetItem extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }).isRequired,
  }

  render() {
    const { item } = this.props
    const { name, url } = item
    return <Text>{`${name} - ${url}`}</Text>
  }
}

import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import { colors } from 'app/styles'

export class DynamicIcon extends React.Component {
  static propTypes = {
    source: PropTypes.string,
    name: PropTypes.string,
    nameIOS: PropTypes.string,
  }

  static defaultProps = {
    source: '',
    name: '',
    nameIOS: '',
  }

  buildSourceComponent = () => {
    const { source, name, nameIOS } = this.props
    // If we're on ios, and we have a specific ios image, use that image.
    const iconName = name && nameIOS && Platform.OS === 'ios' ? nameIOS : name

    switch (source) {
      case 'Ionicons':
        return <Ionicons name={iconName} size={28} color={colors.chartColor} />
      default:
        return <View />
    }
  }

  render() {
    return (
      <View style={styles.iconContainer}>{this.buildSourceComponent()}</View>
    )
  }
}

const styles = StyleSheet.create({
  iconContainer: {},
})

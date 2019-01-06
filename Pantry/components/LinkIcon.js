import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import Colors from 'app/constants/Colors'

export class LinkIcon extends React.Component {
  render() {
    return (
      <View style={styles.iconContainer}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
          size={28}
          color={Colors.chartColor}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  iconContainer: {},
})

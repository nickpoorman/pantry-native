import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'
import Moment from 'moment'
import { MaterialIcons } from '@expo/vector-icons'
import { darkestGray, darkerGray } from 'app/styles'

export default class TargetItem extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      createdAt: PropTypes.string,
    }).isRequired,
  }

  render() {
    const { item } = this.props
    const { name, url, createdAt } = item
    const focused = false
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.dateText}>{Moment(createdAt).format('LL')}</Text>
          <Text style={styles.textPrimary}>{name}</Text>
          <Text style={styles.textSecondary}>{url}</Text>
        </View>
        <View style={styles.radioIconContainer}>
          {/* md-square-outline md-square radio-button-checked radio-button-unchecked */}
          <MaterialIcons
            name={focused ? 'radio-button-checked' : 'radio-button-unchecked'}
            size={28}
            color={darkestGray}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 0.1,
    borderColor: '#d6d7da',
    borderRadius: 7,
  },
  bottomContainer: {
    alignItems: 'flex-end',
    paddingTop: 8,
  },
  dateText: {
    fontSize: 8,
    color: darkerGray,
  },
  textContainer: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  textPrimary: {
    fontSize: 16,
  },
  textSecondary: {
    fontSize: 12,
    color: darkerGray,
  },
  radioIconContainer: {
    justifyContent: 'center',
  },
})

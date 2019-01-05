import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import { CardText } from './CardText'
import Colors from '../../constants/Colors'

export class IconAndText extends React.Component {
  render() {
    const renderIcon = (
      <View style={styles.iconContainer}>
        <Ionicons name='ios-link' size={28} color={Colors.chartColor} />
      </View>
    )

    return (
      <View style={styles.cardFlex}>
        {this.props.iconPosition == 'left' && renderIcon}
        <CardText />
        {this.props.iconPosition == 'right' && renderIcon}
      </View>
    )
  }
}

IconAndText.defaultProps = {
  iconPosition: 'left',
}

IconAndText.propTypes = {
  iconPosition: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  cardFlex: {
    flexDirection: 'row',
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    margin: 8,
  },
  iconContainer: {
    margin: 4,
    justifyContent: 'center',
  },
})

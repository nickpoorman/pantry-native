import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { CardText } from 'app/components/cards/CardText'
import { LinkIcon } from 'app/components/LinkIcon'

export class IconAndText extends React.Component {
  render() {
    const { iconPosition } = this.props

    const renderIcon = (
      <View style={styles.iconContainer}>
        <LinkIcon />
      </View>
    )

    return (
      <View style={styles.cardFlex}>
        {iconPosition == 'left' && renderIcon}
        <View style={styles.textContainer}>
          <CardText />
        </View>
        {iconPosition == 'right' && renderIcon}
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
    flexGrow: 1,
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    margin: 8,
  },
  textContainer: {
    flexGrow: 2,
  },
  iconContainer: {
    justifyContent: 'center',
    margin: 8,
  },
})

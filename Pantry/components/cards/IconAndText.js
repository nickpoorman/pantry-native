import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { CardText } from 'app/components/cards/CardText'
import { LinkIcon } from 'app/components/LinkIcon'

export class IconAndText extends React.Component {
  render() {
    return (
      <View style={styles.cardFlex}>
        {this.props.iconPosition == 'left' && <LinkIcon />}
        <CardText />
        {this.props.iconPosition == 'right' && <LinkIcon />}
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
})

import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { CardText } from 'app/components/cards/CardText'
import { DynamicIcon } from 'app/components/DynamicIcon'

export class IconAndText extends React.Component {
  static propTypes = {
    text: PropTypes.shape({}),
    icon: PropTypes.shape({}),
  }

  static defaultProps = {
    text: {},
    icon: {},
  }

  render() {
    const { icon, text } = this.props
    const { position } = icon
    var validIconPosition = position == 'right' || position == 'left'
    const iconRight = position == 'right'

    const renderIcon = icon.source && icon.name && (
      <View style={styles.iconContainer}>
        <DynamicIcon
          source={icon.source}
          name={icon.name}
          nameIOS={icon.nameIOS}
        />
      </View>
    )

    return (
      <View style={styles.cardFlex}>
        {validIconPosition && !iconRight && renderIcon}
        <View style={styles.textContainer}>
          <CardText text={text} />
        </View>
        {validIconPosition && iconRight && renderIcon}
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
  // iconImage: {
  //   width: 40,
  //   height: 40,
  //   resizeMode: 'contain',
  //   margin: 8,
  // },
  textContainer: {
    flexGrow: 2,
  },
  iconContainer: {
    justifyContent: 'center',
    margin: 8,
  },
})

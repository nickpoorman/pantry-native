import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PropTypes } from 'prop-types'

export class CardText extends React.Component {
  static propTypes = {
    text: PropTypes.shape({
      primaryLarge: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      primary: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      secondary: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
    }),
  }

  static defaultProps = {
    text: {
      primaryLarge: '',
      primary: '',
      secondary: '',
    },
  }

  render() {
    const { text } = this.props
    var { primaryLarge, primary, secondary } = {
      ...CardText.defaultProps.text,
      ...text,
    }
    primaryLarge = primaryLarge.toString()
    primary = primary.toString()
    secondary = secondary.toString()

    const primartLargeSpace = !!primaryLarge && !!primary ? ' ' : ''

    return (
      <View style={styles.cardText}>
        <View style={styles.cardTextPrimaryContainer}>
          <Text style={styles.cardTextPrimaryLarge}>
            {primaryLarge + primartLargeSpace}
          </Text>
          <Text style={styles.cardTextPrimary}>{primary}</Text>
        </View>
        <Text style={styles.cardTextSecondary}>{secondary}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardText: {
    flexDirection: 'column',
    padding: 8,
    justifyContent: 'center',
  },
  cardTextPrimaryContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  cardTextPrimaryLarge: {
    fontSize: 16,
    color: '#222325',
    fontWeight: '500',
  },
  cardTextPrimary: {
    fontSize: 14,
    color: '#222325',
    fontWeight: '500',
  },
  cardTextSecondary: {
    fontSize: 12,
    color: '#a3a3a3',
  },
})

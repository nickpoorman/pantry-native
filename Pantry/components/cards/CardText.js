import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export class CardText extends React.Component {
  render() {
    return (
      <View style={styles.cardText}>
        <View style={styles.cardTextPrimaryContainer}>
          <Text style={styles.cardTextPrimaryNumber}>{'72' + ' '}</Text>
          <Text style={styles.cardTextPrimary}>Comments</Text>
        </View>
        <Text style={styles.cardTextSecondary}>38 shipped</Text>
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
  cardTextPrimaryNumber: {
    fontSize: 18,
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

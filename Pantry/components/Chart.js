import React from 'react'
import { Text } from 'react-native'

export class Chart extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'space-mono' }]}
      />
    )
  }
}

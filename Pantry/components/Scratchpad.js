import React from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { AreaChart, Grid } from 'react-native-svg-charts'
import { Svg } from 'expo'
// import ExtrasExample from 'app/components/stories/ExtrasExample'
// import ExtrasExample2 from 'app/components/stories/ExtrasExample2'
// import Clickable from 'app/components/stories/Clickable'
import ClickableLineChart from 'app/components/charts/clickable/ClickableLineChart'

const verticleInset = 20
const horizontalInset = 15

export class Scratchpad extends React.Component {
  render() {
    return (
      <ClickableLineChart
        contentInset={{
          top: verticleInset,
          bottom: verticleInset,
          left: horizontalInset,
          right: horizontalInset,
        }}
      />
    )
  }
}

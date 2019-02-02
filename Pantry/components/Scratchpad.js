import React from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { AreaChart, Grid } from 'react-native-svg-charts'
import { Svg } from 'expo'
// import ExtrasExample from 'app/components/stories/ExtrasExample'
// import ExtrasExample2 from 'app/components/stories/ExtrasExample2'
// import Clickable from 'app/components/stories/Clickable'
// import ClickableLineChart from 'app/components/charts/clickable/ClickableLineChart'
import ChartWithAxis from 'app/components/charts/ChartWithAxis'

const verticleInset = 20
const horizontalInset = 15

export class Scratchpad extends React.Component {
  render() {
    return <ChartWithAxis />
  }
}

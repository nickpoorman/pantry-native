import React from 'react'
import { StackedBarChart as SVGStackedBarChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import graphStyles from '../../assets/styles/graph-styles'

export class StackedBarChart extends React.PureComponent {
  render() {
    const data = [
      {
        month: new Data(2015, 0, 1),
        apples: 3840,
        bananas: 1920,
        cherries: 960,
        dates: 400,
      },
      {
        month: new Data(2015, 1, 1),
        apples: 1600,
        bananas: 1440,
        cherries: 960,
        dates: 400,
      },
      {
        month: new Data(2015, 2, 1),
        apples: 640,
        bananas: 960,
        cherries: 3640,
        dates: 400,
      },
      {
        month: new Data(2015, 3, 1),
        apples: 3320,
        bananas: 480,
        cherries: 640,
        dates: 400,
      },
    ]

    const colors = ['#7b4173', '#a55194', '#ce6bdb', '#de9ed6']
    const keys = ['apples', 'bananas', 'cherries', 'dates']

    return (
      <SVGStackedBarChart
        // style={{ height: 200 }}
        style={{ ...graphStyles.chartFlex, ...graphStyles.stackedBarChart }}
        keys={keys}
        colors={colors}
        data={data}
        showGrid={false}
        contentInset={{ top: 30, bottom: 30 }}
      />
    )
  }
}

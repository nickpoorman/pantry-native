import React from 'react'
import { LineChart as SVGLineChart, Grid } from 'react-native-svg-charts'
import graphStyles from 'app/assets/styles/graph-styles'
import { colors } from 'app/styles'

export class LineChart extends React.PureComponent {
  render() {
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80,
    ]

    return (
      <SVGLineChart
        style={{ ...graphStyles.chartFlex, ...graphStyles.lineChart }}
        data={data}
        svg={{ stroke: colors.chartColor }}
        contentInset={{ top: 0, bottom: 0 }}
      >
        {/* <Grid /> */}
      </SVGLineChart>
    )
  }
}

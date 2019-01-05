import React from 'react'
import { AreaChart as SVGAreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import graphStyles from '../../assets/styles/graph-styles'
import Colors from '../../constants/Colors'

export class AreaChart extends React.PureComponent {
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

    // const data = [0, 100, 50, 100, 200]

    return (
      <SVGAreaChart
        style={{ ...graphStyles.chartFlex, ...graphStyles.areaChart }}
        data={data}
        svg={{ fill: Colors.chartColor }}
        contentInset={{ top: 0, bottom: 0 }}
        // curve={shape.curveNatural}
      >
        {/* <Grid /> */}
      </SVGAreaChart>
    )
  }
}

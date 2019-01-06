import React from 'react'
import { BarChart as SVGBarChart, Grid } from 'react-native-svg-charts'
import graphStyles from 'app/assets/styles/graph-styles'

export class BarChart extends React.PureComponent {
  render() {
    const fill = 'rgb(134, 65, 244)'
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      null,
      85,
      undefined,
      0,
      35,
      53,
      -53,
      -24,
      50,
      -20,
      -80,
    ]

    return (
      <SVGBarChart
        // TODO: Need to figure out this width issue. It should automatically use all the space to the left or right.
        style={{ ...graphStyles.chartFlex, ...graphStyles.barChart }} // TODO: Refactor this 8 out into a style variable...
        data={data}
        svg={{ fill }}
        contentInset={{ top: 0, bottom: 0 }}
      >
        {/* <Grid /> */}
      </SVGBarChart>
    )
  }
}

import React from 'react'
import { AreaChart as SVGAreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import graphStyles from '../../assets/styles/graph-styles'

export class AreaChart extends React.PureComponent {
  render() {
    // const data = [
    //   50,
    //   10,
    //   40,
    //   95,
    //   -4,
    //   -24,
    //   85,
    //   91,
    //   35,
    //   53,
    //   -53,
    //   24,
    //   50,
    //   -20,
    //   -80
    // ];

    const data = [0, 100, 50, 100, 200]

    return (
      <SVGAreaChart
        // TODO: Need to figure out this width issue. It should automatically use all the space to the left or right.
        style={{ ...graphStyles.chartFlex, ...graphStyles.areaChart }} // TODO: Refactor this 8 out into a style variable...
        data={data}
        svg={{ fill: 'rgb(134, 65, 244, 0.8)' }}
        contentInset={{ top: 0, bottom: 0 }}
        // curve={shape.curveNatural}
      >
        {/* <Grid /> */}
      </SVGAreaChart>
    )
  }
}

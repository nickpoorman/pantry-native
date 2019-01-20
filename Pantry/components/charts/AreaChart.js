import React from 'react'
import { AreaChart as SVGAreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'

import graphStyles from 'app/assets/styles/graph-styles'
import { colors } from 'app/styles'

export class AreaChart extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  static defaultProps = {
    data: [],
  }

  render() {
    const { data } = this.props

    return (
      <SVGAreaChart
        style={{ ...graphStyles.chartFlex, ...graphStyles.areaChart }}
        data={data}
        svg={{ fill: colors.chartColor }}
        contentInset={{ top: 0, bottom: 0 }}
        // curve={shape.curveNatural}
      >
        {/* <Grid /> */}
      </SVGAreaChart>
    )
  }
}

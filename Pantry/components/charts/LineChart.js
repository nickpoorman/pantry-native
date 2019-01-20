import React from 'react'
import { LineChart as SVGLineChart, Grid } from 'react-native-svg-charts'
import PropTypes from 'prop-types'

import graphStyles from 'app/assets/styles/graph-styles'
import { colors } from 'app/styles'

export class LineChart extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  static defaultProps = {
    data: [],
  }

  render() {
    const { data } = this.props
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

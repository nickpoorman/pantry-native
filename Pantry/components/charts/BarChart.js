import React from 'react'
import { BarChart as SVGBarChart, Grid } from 'react-native-svg-charts'
import PropTypes from 'prop-types'

import graphStyles from 'app/assets/styles/graph-styles'

export class BarChart extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(
      // TODO: Need to verify we can pass nulls here if we remove PropTypes.any...
      PropTypes.oneOfType([PropTypes.number, PropTypes.any])
    ).isRequired,
  }

  static defaultProps = {
    data: [],
  }

  render() {
    // This allows nulls and undefined values in the data...
    // const data = [50, -4, -24, null, 85, undefined, 0, 35]
    const { data } = this.props

    const fill = 'rgb(134, 65, 244)'
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

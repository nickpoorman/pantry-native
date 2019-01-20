import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import PropTypes from 'prop-types'

import graphStyles from 'app/assets/styles/graph-styles'
import { colors } from 'app/styles'

export class ProgressCircleChart extends React.PureComponent {
  static propTypes = {
    data: PropTypes.number.isRequired,
  }

  static defaultProps = {
    data: 0,
  }

  render() {
    const { data } = this.props
    return (
      <ProgressCircle
        // style={{ width: 40, height: 40, margin: 8 }}
        style={{ ...graphStyles.chartFlex, ...graphStyles.progressCircleChart }}
        progress={data}
        progressColor={colors.chartColor}
      />
    )
  }
}

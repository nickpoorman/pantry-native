import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import graphStyles from 'app/assets/styles/graph-styles'
import { colors } from 'app/styles'

export class ProgressCircleChart extends React.PureComponent {
  render() {
    return (
      <ProgressCircle
        // style={{ width: 40, height: 40, margin: 8 }}
        style={{ ...graphStyles.chartFlex, ...graphStyles.progressCircleChart }}
        progress={0.7}
        progressColor={colors.chartColor}
      />
    )
  }
}

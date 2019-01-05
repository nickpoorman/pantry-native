import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import graphStyles from '../../assets/styles/graph-styles'
import Colors from '../../constants/Colors'

export class ProgressCircleChart extends React.PureComponent {
  render() {
    return (
      <ProgressCircle
        // style={{ width: 40, height: 40, margin: 8 }}
        style={{ ...graphStyles.chartFlex, ...graphStyles.progressCircleChart }}
        progress={0.7}
        progressColor={Colors.chartColor}
      />
    )
  }
}

import React from 'react'
import { PieChart as SVGPieChart } from 'react-native-svg-charts'
import graphStyles from '../../assets/styles/graph-styles'
import { generateHexColors } from '../../utils/colors'

export class PieChart extends React.PureComponent {
  render() {
    const data = [40, 60, 20].sort((a, b) => a - b)
    const startColor = 'rgb(126, 75, 205)'
    const stopColor = 'rgb(241, 235, 249)'
    const colors = generateHexColors(startColor, stopColor, data.length)
    const getNextColor = () => colors.pop()

    const pieData = data
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: getNextColor(),
          onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
      }))

    return (
      <SVGPieChart
        // style={{ width: 40, height: 40, margin: 8 }}
        style={{ ...graphStyles.chartFlex, ...graphStyles.pieChart }}
        data={pieData}
      />
    )
  }
}

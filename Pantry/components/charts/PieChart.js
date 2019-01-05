import React from 'react'
import { PieChart as SVGPieChart } from 'react-native-svg-charts'
import graphStyles from '../../assets/styles/graph-styles'
import { generateHexColors } from '../../utils/colors'
import Colors from '../../constants/Colors'

export class PieChart extends React.PureComponent {
  render() {
    const data = [40, 60, 20].sort((a, b) => a - b)

    const colors = generateHexColors(
      Colors.chartColor,
      Colors.chartColorLight,
      data.length
    )
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
        style={{ ...graphStyles.chartFlex, ...graphStyles.pieChart }}
        data={pieData}
      />
    )
  }
}

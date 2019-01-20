import React from 'react'
import { PieChart as SVGPieChart } from 'react-native-svg-charts'
import PropTypes from 'prop-types'

import graphStyles from 'app/assets/styles/graph-styles'
import { generateHexColors } from 'app/utils/colors'
import { colors } from 'app/styles'

export class PieChart extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  static defaultProps = {
    data: [],
  }

  getSortedData = () => {
    const { data } = this.props
    return data.sort((a, b) => a - b)
  }

  render() {
    const data = this.getSortedData()

    const generatedColors = generateHexColors(
      colors.chartColor,
      colors.chartColorLight,
      data.length
    )
    const getNextColor = () => generatedColors.pop()

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

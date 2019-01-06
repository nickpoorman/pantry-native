import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import { CardText } from 'app/components/cards/CardText'
import { PieChart } from 'app/components/charts/PieChart'
import { LineChart } from 'app/components/charts/LineChart'
import { AreaChart } from 'app/components/charts/AreaChart'
import { ProgressCircleChart } from 'app/components/charts/ProgressCircleChart'
import { BarChart } from 'app/components/charts/BarChart'

export class ChartAndText extends React.Component {
  renderChartByType() {
    const { chartType } = this.props
    if (chartType == 'pie') {
      return <PieChart />
    } else if (chartType == 'line') {
      return <LineChart />
    } else if (chartType == 'area') {
      return <AreaChart />
    } else if (chartType == 'progress') {
      return <ProgressCircleChart />
    } else if (chartType == 'bar') {
      return <BarChart />
    }
  }

  render() {
    const { chartPosition } = this.props
    return (
      <View style={styles.cardFlex}>
        {/* We could allow them to specify if the chart is left or right but I think it's going to make the UI ugly. */}
        {/* {chartPosition == 'left' && this.renderChartByType()} */}
        <CardText />
        {chartPosition == 'right' && this.renderChartByType()}
      </View>
    )
  }
}

ChartAndText.defaultProps = {
  chartPosition: 'right',
  chartType: 'pie',
}

ChartAndText.propTypes = {
  chartPosition: PropTypes.oneOf(['left', 'right']).isRequired,
  chartType: PropTypes.oneOf(['pie', 'line', 'area', 'progress', 'bar'])
    .isRequired,
}

const styles = StyleSheet.create({
  cardFlex: {
    flexDirection: 'row',
    flexGrow: 1,
  },
})

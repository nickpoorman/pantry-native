import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'

import { CardText } from 'app/components/cards/CardText'
import { PieChart } from 'app/components/charts/PieChart'
import { LineChart } from 'app/components/charts/LineChart'
import { AreaChart } from 'app/components/charts/AreaChart'
import { ProgressCircleChart } from 'app/components/charts/ProgressCircleChart'
import { BarChart } from 'app/components/charts/BarChart'

export class ChartAndText extends React.Component {
  static propTypes = {
    chartType: PropTypes.oneOf(['pie', 'line', 'area', 'progress', 'bar'])
      .isRequired,
    text: PropTypes.shape({}).isRequired,
    chart: PropTypes.shape({
      data: PropTypes.any,
    }).isRequired,
    chartPosition: PropTypes.oneOf(['left', 'right']).isRequired,
  }

  static defaultProps = {
    chartType: '',
    text: {},
    chart: {},
    chartPosition: 'right',
  }

  renderChartContainer() {
    // return <View style={styles.chartContainer}>{this.renderChartByType()}</View>
    return this.renderChartByType()
  }

  renderChartByType() {
    const { chartType, chart } = this.props
    const { data } = chart
    if (chartType == 'pie') {
      return <PieChart data={data} />
    } else if (chartType == 'line') {
      return <LineChart data={data} />
    } else if (chartType == 'area') {
      return <AreaChart data={data} />
    } else if (chartType == 'progress') {
      return <ProgressCircleChart data={data} />
    } else if (chartType == 'bar') {
      return <BarChart data={data} />
    }
  }

  render() {
    const { chartType, chartPosition, text } = this.props
    return (
      <View style={styles.cardFlex}>
        {/* We could allow them to specify if the chart is left or right but I think it's going to make the UI ugly. */}
        {/* {chartPosition == 'left' && this.renderChartByType()} */}
        <View style={styles.textContainer}>
          <CardText text={text} />
        </View>
        <View style={styles.chartContainer}>
          {chartPosition == 'right' && this.renderChartContainer()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardFlex: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  textContainer: {
    flexGrow: 1,
  },
  chartContainer: {
    flexGrow: 4,
    flexBasis: 50,
  },
})

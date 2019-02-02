import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'

import { CardText } from 'app/components/cards/CardText'
import { PieChart } from 'app/components/charts/PieChart'
import { LineChart } from 'app/components/charts/LineChart'
import { AreaChart } from 'app/components/charts/AreaChart'
import { ProgressCircleChart } from 'app/components/charts/ProgressCircleChart'
import { BarChart } from 'app/components/charts/BarChart'
import { ChartWithAxis } from 'app/components/charts/ChartWithAxis'

export class LargeChartAndText extends React.Component {
  state = {
    chartSelectedText: null,
  }

  static propTypes = {
    chartType: PropTypes.oneOf(['pie', 'line', 'area', 'progress', 'bar'])
      .isRequired,
    text: PropTypes.shape({}).isRequired,
    chart: PropTypes.shape({
      data: PropTypes.any,
    }).isRequired,
  }

  static defaultProps = {
    chartType: '',
    text: {},
    chart: {},
  }

  renderChartContainer() {
    // return <View style={styles.chartContainer}>{this.renderChartByType()}</View>
    return this.renderChartByType()
  }

  renderChartByType() {
    const { chartType, chart } = this.props
    const { data } = chart
    if (chartType == 'line') {
      return (
        <ChartWithAxis
          data={data}
          setSelectedText={textObj => {
            this.setState({ chartSelectedText: textObj })
          }}
        />
      )
    }
  }

  render() {
    const { text } = this.props

    return (
      <View style={styles.cardFlex}>
        <View style={styles.textContainer}>
          <View style={styles.textContainerGroup}>
            <CardText text={text} />
            {this.state.chartSelectedText && (
              <CardText text={this.state.chartSelectedText} />
            )}
          </View>
        </View>
        <View style={styles.chartContainer}>{this.renderChartContainer()}</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardFlex: {
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  textContainer: {
    flexGrow: 1,
    marginBottom: 8,
  },
  textContainerGroup: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  chartContainer: {
    flexGrow: 4,
    flexBasis: 50,
  },
})

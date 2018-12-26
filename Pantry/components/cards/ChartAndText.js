import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from 'prop-types';

import { CardText } from "./CardText";
import { PieChart } from "../PieChart";
import { LineChart } from "../LineChart";
import { AreaChart } from "../AreaChart";
import { ProgressCircleChart } from "../ProgressCircleChart";
import { BarChart } from "../BarChart";

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
        {chartPosition == 'left' && this.renderChartByType()}
        <CardText />
        {chartPosition == 'right' && this.renderChartByType()}
      </View>
    );
  }
}

ChartAndText.defaultProps = {
  chartPosition: 'left',
  chartType: 'pie'
}

ChartAndText.propTypes = {
  chartPosition: PropTypes.oneOf(['left', 'right']).isRequired,
  chartType: PropTypes.oneOf(['pie', 'line', 'area', 'progress', 'bar']).isRequired,
}

const styles = StyleSheet.create({
  cardFlex: {
    flexDirection: "row",
  }
});

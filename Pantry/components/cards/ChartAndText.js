import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from 'prop-types';

import { CardText } from "./CardText";
import { PieChart } from "../PieChart";
import { LineChart } from "../LineChart";
import { AreaChart } from "../AreaChart";

export class ChartAndText extends React.Component {
  renderChartByType() {
    const { chartType } = this.props
    if (chartType == 'pie') {
      return <PieChart />
    } else if (chartType == 'line') {
      return <LineChart />
    } else if (chartType == 'area') {
      return <AreaChart />
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
  chartType: PropTypes.oneOf(['pie', 'line', 'area']).isRequired,
}

const styles = StyleSheet.create({
  cardFlex: {
    flexDirection: "row",
  }
});

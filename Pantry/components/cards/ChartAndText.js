import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from 'prop-types';

import { PieChart } from "../PieChart";
import { CardText } from "./CardText";

export class ChartAndText extends React.Component {
  render() {
    return (
      <View style={styles.cardFlex}>
        {this.props.chartPosition == 'left' && <PieChart />}
        <CardText />
        {this.props.chartPosition == 'right' && <PieChart />}
      </View>
    );
  }
}

ChartAndText.defaultProps = {
  chartPosition: 'left'
}

ChartAndText.propTypes = {
  chartPosition: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  cardFlex: {
    flexDirection: "row",
  }
});

import React from "react";
import { Text } from "react-native";
import { AreaChart as SVGAreaChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";

export class AreaChart extends React.PureComponent {
  render() {
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80
    ];

    return (
      <SVGAreaChart
        style={{ height: 200 }}
        data={data}
        svg={{ fill: "rgb(134, 65, 244, 0.8)" }}
        contentInset={{ top: 30, bottom: 30 }}
        curve={shape.curveNatural}
      >
        <Grid />
      </SVGAreaChart>
    );
  }
}

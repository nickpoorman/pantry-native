import React from "react";
import { Text } from "react-native";
import { LineChart as SVGLineChart, Grid } from "react-native-svg-charts";

export class LineChart extends React.PureComponent {
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
      <SVGLineChart
      // TODO: Need to figure out this width issue. It should automatically use all the space to the left or right.
        style={{ width: '50%', margin: 8 }}
        data={data}
        svg={{ stroke: "rgb(134, 65, 244)" }}
        contentInset={{ top: 0, bottom: 0 }}
      >
        {/* <Grid /> */}
      </SVGLineChart>
    );
  }
}

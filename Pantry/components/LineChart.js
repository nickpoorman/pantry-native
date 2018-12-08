import React from "react";
import { Text } from "react-native";
import { LineChart as SVGLineChart, Gird } from "react-native-svg-charts";

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
        style={{ height: 200 }}
        data={data}
        svg={{ stroke: "rgb(134, 65, 244)" }}
        contentInset={{ top: 20, bottom: 20 }}
      >
        <Grid />
      </SVGLineChart>
    );
  }
}

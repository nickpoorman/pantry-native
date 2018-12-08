import React from "react";
import { Text } from "react-native";
import { PieChart as SVGPieChart } from "react-native-svg-charts";

export class PieChart extends React.PureComponent {
  render() {
    const data = [60, 40];

    const randomColor = () =>
      ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
        0,
        7
      );

    const pieData = data
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: randomColor(),
          onPress: () => console.log("press", index)
        },
        key: `pie-${index}`
      }));

    return (
      <SVGPieChart
        style={{ width: 40, height: 40, margin: 8 }}
        data={pieData}
      />
    );
  }
}

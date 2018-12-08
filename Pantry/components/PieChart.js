import React from "react";
import { Text } from "react-native";
import { PieChart as SVGPieChart } from "react-native-svg-charts";

export class PieChart extends React.PureComponent {
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

    const randomColor = () =>
      ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
        0,
        7
      );

    const pieData = data.filter(value, index).map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        onPress: () => console.log("press", index)
      },
      key: `pie-${index}`
    }));

    return <SVGPieChart style={{ height: 200 }} data={pieData} />;
  }
}

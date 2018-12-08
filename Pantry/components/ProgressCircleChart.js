import React from "react";
import { Text } from "react-native";
import { ProgressCircle } from "react-native-svg-charts";

export class ProgressCircleChart extends React.PureComponent {
  render() {
    return (
      <ProgressCircle
        style={{ height: 200 }}
        progress={0.7}
        progressColor={"rgb(134, 65, 244)"}
      />
    );
  }
}

import React from "react";
import {
  ScrollView,
  StyleSheet,
  View
} from "react-native";

import { CardText } from "./cards/CardText";
import { ChartAndText } from "./cards/ChartAndText";
import { IconAndText } from "./cards/IconAndText";

export class Card extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
        >
            <View style={styles.card}><CardText /></View>
            <View style={styles.card}><ChartAndText /></View>
            <View style={styles.card}><ChartAndText chartPosition="right"/></View>

            <View style={styles.card}><IconAndText /></View>
            <View style={styles.card}><IconAndText iconPosition="right"/></View>

            <View style={styles.card}><ChartAndText chartPosition="left" chartType="area"/></View>
            <View style={styles.card}><ChartAndText chartPosition="right" chartType="area"/></View>

            <View style={styles.card}><ChartAndText chartPosition="left" chartType="line"/></View>
            <View style={styles.card}><ChartAndText chartPosition="right" chartType="line"/></View>
          
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0"
  },
  scrollContentContainer: {
    paddingTop: 30
  },
  card: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 8,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderWidth: 0.1,
    borderColor: "#d6d7da",
    borderRadius: 7
  }
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export class CardText extends React.Component {
  render() {
    return (
      <View style={styles.cardText}>
        <Text style={styles.cardTextPrimary}>40 Orders</Text>
        <Text style={styles.cardTextSecondary}>38 shipped</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardText: {
    flexDirection: "column",
    padding: 8,
    justifyContent: "center"
  },
  cardTextPrimary: {
    fontSize: 17,
    color: "#222325",
    lineHeight: 24
    // textAlign: "center"
  },
  cardTextSecondary: {
    fontSize: 12,
    color: "#a3a3a3"
    // lineHeight: 18
    // textAlign: "center"
  }
});

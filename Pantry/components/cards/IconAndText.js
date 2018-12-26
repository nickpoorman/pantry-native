import React from "react";
import { StyleSheet, Image, View } from "react-native";
import PropTypes from "prop-types";

import { CardText } from "./CardText";

export class IconAndText extends React.Component {
  render() {
    return (
      <View style={styles.cardFlex}>
        {this.props.iconPosition == "left" && (
          <Image
            source={require("../../assets/images/piechart.png")}
            style={styles.iconImage}
          />
        )}
        <CardText />
        {this.props.iconPosition == "right" && (
          <Image
            source={require("../../assets/images/piechart.png")}
            style={styles.iconImage}
          />
        )}
      </View>
    );
  }
}

IconAndText.defaultProps = {
  iconPosition: "left"
};

IconAndText.propTypes = {
  iconPosition: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  cardFlex: {
    flexDirection: "row"
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    margin: 8
  }
});

import React from "react";
import { ExpoConfigView } from "@expo/samples";
import { Text, View, ScrollView } from "react-native";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "app.json"
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <ScrollView>
        <View>
          <Text>Hello there</Text>
        </View>
        <ExpoConfigView />
      </ScrollView>
    );
  }
}

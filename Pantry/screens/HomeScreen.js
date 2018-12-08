import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  // used to resize on orientation of display
  reRenderWebView(e) {
    this.setState({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View style={styles.card}>
            <Image
              source={require("../assets/images/piechart.png")}
              style={styles.iconImage}
            />
            <View style={styles.cardText}>
              <Text style={styles.cardTextPrimary}>40 Orders</Text>
              <Text style={styles.cardTextSecondary}>38 shipped</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardText}>
              <Text style={styles.cardTextPrimary}>40 Orders</Text>
              <Text style={styles.cardTextSecondary}>38 shipped</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardText}>
              <Text style={styles.cardTextPrimary}>40 Orders</Text>
              <Text style={styles.cardTextSecondary}>38 shipped</Text>
            </View>
            <Image
              source={require("../assets/images/piechart.png")}
              style={styles.iconImage}
            />
          </View>
        </ScrollView>

        {/* <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View>
        </View> */}
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
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
  chartBox: {
    backgroundColor: "#f0f0f0"
  },
  card: {
    marginTop: 17,
    marginLeft: 17,
    marginRight: 17,
    padding: 8,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    borderRadius: 2
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    margin: 8
  },
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

const oldStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});

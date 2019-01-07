import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from 'app/components/TabBarIcon'
import HomeScreen from 'app/screens/HomeScreen'
import TargetsScreen from 'app/screens/TargetsScreen'
import SettingsScreen from 'app/screens/SettingsScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Metriks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'}
    />
  ),
}

const TargetsStack = createStackNavigator({
  Targets: TargetsScreen,
})

TargetsStack.navigationOptions = {
  tabBarLabel: 'Targets',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-add-circle-outline'
          : 'md-add-circle-outline'
      }
    />
  ),
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
}

export default createBottomTabNavigator({
  HomeStack,
  TargetsStack,
  SettingsStack,
})

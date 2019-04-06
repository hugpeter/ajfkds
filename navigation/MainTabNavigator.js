import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import DispatchScreen from '../screens/Dispatch';

import PickupScreen from '../screens/Pickup';
import ScannerScreen from '../screens/Scanner';
import PickupConfirmScreen from '../screens/PickupConfirm';

import DeliveryScreen from '../screens/Delivery';

import SettingsScreen from '../screens/Settings';

const DispatchStack = createStackNavigator({
  Dispatch: DispatchScreen,
});

const PickUpStack = createStackNavigator({
  Pickup: PickupScreen,
  Scanner: ScannerScreen,
  PickupConfirm: PickupConfirmScreen
});

const DeliveryStack = createStackNavigator({
  Delivery: DeliveryScreen,
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

export default createBottomTabNavigator(
  {
    DispatchStack,
    PickUpStack,
    DeliveryStack,
    SettingsStack
  },
  {
    initialRouteName: 'DispatchStack',
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        switch(routeName){
          case 'DispatchStack':
            return (
              <TabBarIcon
                focused={focused}
                library={'Ionicons'}
                name={
                  Platform.OS === 'ios'
                    ? 'ios-list'
                    : 'md-list'
                }
              />
            );
          case 'PickUpStack':
            return (
              <TabBarIcon
                focused={focused}
                library={'MaterialCommunityIcons'}
                name={'qrcode-scan'}
              />
            );
          case 'DeliveryStack':
            return (
              <TabBarIcon
                focused={focused}
                library={'MaterialCommunityIcons'}
                name={'truck-fast'}
              />
            );
          case 'SettingsStack':
            return (
              <TabBarIcon
                focused={focused}
                library={'Ionicons'}
                name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
              />
            );
        }
      },
    }),
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
    }
  }
);

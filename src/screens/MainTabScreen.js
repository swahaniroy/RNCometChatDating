import React, { useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { withTheme } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { CometChat } from "@cometchat-pro/react-native-chat";
import Config from "react-native-config";

import MatchStackScreen from "./MatchStackScreen";
import ChatStackScreen from "./ChatStackScreen";

import { UserContext } from "../context/UserContext";

import LogoutButton from "../components/LogoutButton";

import config from "../config";

const Tab = createBottomTabNavigator();

var apiKey = Config.COMETCHAT_AUTH_KEY;
var receiverType = CometChat.RECEIVER_TYPE.USER;

const MainTabScreen = ({ route, navigation, theme }) => {
  const { colors } = theme;
  const { userId, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (userId && isLoggedIn && apiKey) {
      CometChat.login(userId.toLowerCase(), apiKey).then(
        (user) => {
          console.log("Login Successful:", { user });
        },
        (error) => {
          console.log("Login failed with exception:", { error });
        }
      );
    }
  }, [isLoggedIn, userId, apiKey]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MatchStack"
        component={MatchStackScreen}
        options={{
          tabBarLabel: "Match",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStackScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="envelope" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default withTheme(MainTabScreen);

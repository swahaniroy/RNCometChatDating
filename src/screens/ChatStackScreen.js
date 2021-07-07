import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatListScreen from "./ChatListScreen";
import Messages from "./Messages";
import LogoutButton from "../components/LogoutButton";

const Stack = createStackNavigator();

const ChatStackScreen = ({ navigation, route }) => {
	if (route.state && route.state.index > 0) {
		navigation.setOptions({ tabBarVisible: false });
	} else {
		navigation.setOptions({ tabBarVisible: true });
	}
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="ChatList"
				component={ChatListScreen}
				options={{
					headerRight: () => <LogoutButton />,
				}}
			/>
			<Stack.Screen
				name="Messages"
				component={Messages}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default ChatStackScreen;

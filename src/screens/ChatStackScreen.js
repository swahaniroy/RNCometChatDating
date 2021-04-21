import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatListScreen from "./ChatListScreen";
import Messages from "./Messages";

const Stack = createStackNavigator();

const ChatStackScreen = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="ChatList" component={ChatListScreen} />
			<Stack.Screen name="Messages" component={Messages} />
		</Stack.Navigator>
	);
};

export default ChatStackScreen;

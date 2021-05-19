import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MatchScreen from "./MatchScreen";
import LogoutButton from "../components/LogoutButton";

const Stack = createStackNavigator();

const MatchStackScreen = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Match"
				component={MatchScreen}
				options={{
					headerRight: () => <LogoutButton />,
				}}
			/>
		</Stack.Navigator>
	);
};

export default MatchStackScreen;

import "react-native-gesture-handler";

import { AppRegistry } from "react-native";
import App from "./App";

import { CometChat } from "@cometchat-pro/react-native-chat";

import Config from "react-native-config";

var appID = Config.COMETCHAT_APP_ID;
var region = Config.COMETCHAT_APP_REGION;

var appSetting = new CometChat.AppSettingsBuilder()
	.subscribePresenceForAllUsers()
	.setRegion(region)
	.build();
CometChat.init(appID, appSetting).then(
	() => {
		console.log("Initialization completed successfully");
	},
	(error) => {
		console.log("Initialization failed with error:", error);
	}
);

import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);

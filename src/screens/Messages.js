import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { CometChatMessages } from "../cometchat-pro-react-native-ui-kit-master";

const Messages = ({ route }) => {
	const { matchId, userName } = route.params;
	const avatar = `https://robohash.org/${userName}`;
	const [localUser, setLocalUser] = useState(null);

	const [userToChat, setUserToChat] = useState(null);

	useEffect(() => {
		var user = CometChat.getLoggedinUser().then(
			(user) => {
				setLocalUser(user);
			},
			(error) => {
				console.log("error getting details:", { error });
			}
		);

		CometChat.getUser(matchId.toLowerCase()).then(
			(user) => {
				setUserToChat(user);
				console.log("got user: ", { user });
			},
			(error) => {
				console.log("error getting user: ", { error });
			}
		);
	}, []);

	const actionGenerated = () => {};

	if (localUser && userToChat) {
		return (
			<View style={{ flex: 1 }}>
				<CometChatMessages
					type={"user"}
					item={userToChat}
					loggedInUser={localUser}
					actionGenerated={actionGenerated}
					audioCall={false}
					videoCall={false}
				/>
			</View>
		);
	}

	return null;
};

export default Messages;

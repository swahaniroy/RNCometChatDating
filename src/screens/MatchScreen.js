import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Image, Alert, StyleSheet } from "react-native";
import { Text, withTheme } from "react-native-paper";

import firestore from "@react-native-firebase/firestore";

import PersonCard from "../components/PersonCard";

import { UserContext } from "../context/UserContext";

const usersCollection = firestore().collection("users");
const matchesCollection = firestore().collection("matches");
const chatsCollection = firestore().collection("chats");

const MatchScreen = ({ theme }) => {
	const { fonts } = theme;
	const {
		userId,
		userName,
		gender,
		matchedUsers,
		addMatchedUser,
	} = useContext(UserContext);
	const [potentialMatches, setPotentialMatches] = useState(null);

	useEffect(() => {
		(async () => {
			if (gender) {
				const opposite_gender = gender === "M" ? "F" : "M";

				const matchesQuerySnapshot = await matchesCollection
					.where("user_A", "==", userId)
					.get();

				const previousMatches = [];
				if (matchesQuerySnapshot.size) {
					matchesQuerySnapshot.forEach((documentSnapshot) => {
						const matches_data = documentSnapshot.data();
						previousMatches.push(matches_data.user_B);
					});
				}

				let usersQuerySnapshot;
				if (previousMatches.length > 0) {
					usersQuerySnapshot = await usersCollection
						.where("gender", "==", opposite_gender)
						.where("auth_uid", "not-in", previousMatches)
						.get();
				} else {
					usersQuerySnapshot = await usersCollection
						.where("gender", "==", opposite_gender)
						.get();
				}

				if (usersQuerySnapshot.size) {
					const users = [];
					usersQuerySnapshot.forEach((documentSnapshot) => {
						const user_data = documentSnapshot.data();

						users.push({
							id: user_data.auth_uid, // firebase auth id
							name: user_data.name,
							gender: user_data.gender,
						});
					});

					setPotentialMatches(users);
				}
			}
		})();
	}, [gender]);

	const decide = useCallback(
		async (person, decision) => {
			// update the UI to exclude this user
			addMatchedUser(person.id);

			const filtered = potentialMatches.filter(
				function (e) {
					return this.indexOf(e.id) === -1;
				},
				[...matchedUsers, person.id]
			);

			setPotentialMatches(filtered);

			await matchesCollection.add({
				user_A: userId,
				user_B: person.id,
				status: decision,
			});

			if (decision === "like") {
				// check if there's a match
				const querySnapshot = await matchesCollection
					.where("user_A", "==", person.id) // user being liked
					.where("user_B", "==", userId) // current user
					.limit(1)
					.get();

				if (querySnapshot.size) {
					// has a match
					Alert.alert(
						"It's a match",
						`Congratulations! You have matched with ${person.name}. You can now start chatting on the chats screen.`
					);

					await chatsCollection.add({
						user_A_id: userId,
						user_A_name: userName,
						user_B_id: person.id,
						user_B_name: person.name,
					});

					await chatsCollection.add({
						user_A_id: person.id,
						user_A_name: person.name,
						user_B_id: userId,
						user_B_name: userName,
					});
				}
			}
		},
		[potentialMatches, userId, userName, matchedUsers]
	);

	if (potentialMatches && potentialMatches.length > 0) {
		const currentPerson = potentialMatches[0];
		return (
			<View>
				<PersonCard person={currentPerson} decide={decide} />
			</View>
		);
	}
	return (
		<View style={styles.textContainer}>
			<Text style={{ fontSize: fonts.medium }}>
				No potential matches at the moment
			</Text>
		</View>
	);
};

export default withTheme(MatchScreen);

const styles = StyleSheet.create({
	textContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		flexGrow: 1,
	},
});

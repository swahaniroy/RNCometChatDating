import React, { useState, useCallback, useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
	Button,
	Text,
	TextInput,
	RadioButton,
	withTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import axios from "axios";

import config from "../config";

import { UserContext } from "../context/UserContext";

const usersCollection = firestore().collection("users");

const RegisterScreen = ({ navigation, theme }) => {
	const { setIsLoggedIn } = useContext(UserContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [gender, setGender] = useState("M");

	const [buttonloading, setButtonLoading] = useState(false);

	const { colors } = theme;

	const registerText = buttonloading ? "Signing up.." : "Register";

	const signUp = useCallback(async () => {
		try {
			const firebase_auth_res = await auth().createUserWithEmailAndPassword(
				email,
				password
			);

			const uid = firebase_auth_res.user.uid;
			const firebase_res = await usersCollection.add({
				auth_uid: uid,
				name,
				email,
				gender,
			});

			await axios.post(`${config.BASE_URL}/create-user`, {
				uid,
				firebase_doc_uid: firebase_res.id,
				name,
				email,
				gender,
			});

			setIsLoggedIn(true);

			await AsyncStorage.setItem("user_id", uid);
		} catch (err) {
			if (err.code === "auth/email-already-in-use") {
				console.log("That email address is already in use!");
			}

			if (err.code === "auth/invalid-email") {
				console.log("That email address is invalid!");
			}
			console.error(err);
		}
	}, [name, email, password, gender]);

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<TextInput
				mode="outlined"
				style={styles.input}
				onChangeText={(text) => setName(text)}
				value={name}
				placeholder="Name"
			/>

			<TextInput
				mode="outlined"
				style={styles.input}
				onChangeText={(text) => setEmail(text)}
				value={email}
				placeholder="Email"
				keyboardType="email-address"
			/>

			<TextInput
				mode="outlined"
				style={styles.input}
				onChangeText={(text) => setPassword(text)}
				value={password}
				placeholder="Password"
				secureTextEntry
			/>

			<View>
				<RadioButton.Group
					onValueChange={(newValue) => setGender(newValue)}
					value={gender}
				>
					<View style={styles.radio}>
						<RadioButton.Android value="M" color={colors.primary} />
						<Text>Male</Text>
					</View>
					<View style={styles.radio}>
						<RadioButton.Android value="F" color={colors.primary} />
						<Text>Female</Text>
					</View>
				</RadioButton.Group>
			</View>

			<Button
				mode="contained"
				onPress={signUp}
				style={styles.button}
				loading={buttonloading}
			>
				{registerText}
			</Button>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("LoginScreen");
					}}
				>
					<View>
						<Text>Already have an account?</Text>
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default withTheme(RegisterScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingRight: 30,
		paddingLeft: 30,
		flexDirection: "column",
	},
	input: {
		fontSize: 15,
		height: 40,
		width: "100%",
		marginBottom: 10,
		backgroundColor: "#F5F5F7",
	},
	buttonContainer: {
		marginTop: 10,
		alignItems: "center",
	},
	button: {
		padding: 0,
		marginTop: 15,
		width: "100%",
		borderRadius: 20,
	},
	radio: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
});

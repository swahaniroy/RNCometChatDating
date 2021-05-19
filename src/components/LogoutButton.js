import React, {useCallback} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CometChat} from '@cometchat-pro/react-native-chat';

const LogoutButton = () => {
	const logout = useCallback(async () => {
		await auth().signOut();
		await CometChat.logout();
	}, []);

	return (
		<TouchableOpacity onPress={logout}>
			<View style={styles.buttonContainer}>
				<Text>Logout</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		padding: 10,
	},
});

export default LogoutButton;

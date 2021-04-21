import React, { useState, useContext, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Text, TextInput, withTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";

import config from "../config";

import { UserContext } from "../context/UserContext";

const LoginScreen = ({ navigation, theme }) => {
  const { setIsLoggedIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonloading, setButtonLoading] = useState(false);

  const { colors } = theme;

  const loginText = buttonloading ? "Logging in.." : "Login";

  const login = useCallback(async () => {
    try {
      const login_res = await auth().signInWithEmailAndPassword(
        email,
        password
      );

      setIsLoggedIn(true);
    } catch (err) {
      console.log("err logging in: ", err);
    }
  }, [email, password]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
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

      <Button
        mode="contained"
        onPress={login}
        style={styles.button}
        loading={buttonloading}
      >
        {loginText}
      </Button>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RegisterScreen");
          }}
        >
          <Text>Don't have an account yet?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 30,
    paddingLeft: 30,
    flexDirection: "column",
    alignItems: "center",
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
  },
  button: {
    padding: 0,
    marginTop: 15,
    width: "100%",
    borderRadius: 20,
  },
});

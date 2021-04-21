import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { withTheme } from "react-native-paper";

const SplashScreen = ({ theme }) => {
  const { colors } = theme;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default withTheme(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { UserContextProvider } from "./context/UserContext";

import Home from "./Home";

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    background: "#F6F8FA",
    primary: "#333",
    info: "#BFD9EC",
    success: "#1ED75F",
    danger: "#D94848",
  },
  fonts: {
    ...DefaultTheme.fonts,
    big: 24,
    regular: 15,
    medium: 20,
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <UserContextProvider>
        <Home />
      </UserContextProvider>
    </PaperProvider>
  );
};

export default App;

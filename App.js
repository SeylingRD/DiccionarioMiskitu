import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import CreateWordScreen from "./screens/CreateWordScreen";
import WordDetailScreen from "./screens/WordDetailScreen";
import WordList from "./screens/WordList";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff0064",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="WordList"
        component={WordList}
        options={{ title: "Word List" }}
      />
      <Stack.Screen
        name="CreateWordScreen"
        component={CreateWordScreen}
        options={{ title: "Create a New Word" }}
      />
      <Stack.Screen
        name="WordDetailScreen"
        component={WordDetailScreen}
        options={{ title: "Word Detail" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

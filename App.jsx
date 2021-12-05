import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Hello from "./src/components/Hello";

export default function App() {
  return (
    <View style={styles.container}>
      <Hello
        bang
        style={{
          fontSize: 10,
        }}
      >
        kuriyama
      </Hello>
      <Hello bang>keita</Hello>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
  },
});

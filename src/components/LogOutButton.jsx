import { useNavigation } from "@react-navigation/core";
import React from "react";
import firebase from "firebase";
import { TouchableOpacity, StyleSheet, Text, Alert } from "react-native";

export default function LogOutButton() {
  const navigation = useNavigation();
  function handlePress() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch((error) => {
        Alert.alert("Failed Log Out");
      });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.label}>Log Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
});

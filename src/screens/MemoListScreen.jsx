import React, { useEffect } from "react";
import firebase from "firebase";
import { View, StyleSheet, Alert } from "react-native";
import CircleButton from "../components/CircleButton";
import LogOutButton from "../components/LogOutButton";
import MemoList from "../components/MemoList";

export default function MemoListScreen(props) {
  const { navigation } = props;
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const ref = db
        .collection(`users/${currentUser.uid}/memos`)
        .orderBy("updatedAt", "desc");
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
          });
        },
        (error) => {
          console.log(error);
          Alert.alert("Error", error.message);
        }
      );
    }
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <MemoList />
      <CircleButton
        name="plus"
        onPress={() => {
          navigation.navigate("MemoCreate");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
});

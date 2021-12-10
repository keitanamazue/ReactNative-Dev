import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { View, StyleSheet, Alert, Text } from "react-native";
import CircleButton from "../components/CircleButton";
import LogOutButton from "../components/LogOutButton";
import MemoList from "../components/MemoList";
import Button from "../components/Button";
import Loading from "../components/Loading";

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const ref = db
        .collection(`users/${currentUser.uid}/memos`)
        .orderBy("updatedAt", "desc");
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userMemos = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            userMemos.push({
              id: doc.id,
              bodyText: data.bodyText,
              updatedAt: data.updatedAt.toDate(),
            });
          });
          setMemos(userMemos);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          Alert.alert("Error", error.message);
        }
      );
    }
    return unsubscribe;
  }, []);

  if (memos.length === 0) {
    return (
      <View style={emptyStyles.container}>
        <Loading isLoading={isLoading} />
        <View style={emptyStyles.inner}>
          <Text style={emptyStyles.title}>nothing memo</Text>
          <Button
            style={emptyStyles.button}
            label="create memo"
            onPress={() => {
              navigation.navigate("MemoCreate");
            }}
          ></Button>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
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

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    marginBottom: 24,
  },

  button: {
    alignSelf: "center",
  },
});

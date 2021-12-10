import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { shape, string, instanceOf, arrayOf } from "prop-types";
import { dateToString } from "../utils";
import firebase from "firebase";

export default function MemoList(props) {
  const navigation = useNavigation();
  const { memos } = props;

  // function deleteMemo(id) {
  //   const { currentUser } = firebase.auth();
  //   if (currentUser) {
  //     const db = firebase.firestore();
  //     const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
  //     Alert.alert("Are you sure?", "it will never return", [
  //       {
  //         text: "Cancel",
  //         onPress: () => {},
  //       },
  //       {
  //         text: "Delete",
  //         style: "destructive",
  //         onPress: () => {
  //           ref.delete().catch(() => {
  //             Alert.alert("Fail to delete");
  //           });
  //         },
  //       },
  //     ]);
  //   }
  // }

  function deleteMemo(id) {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      Alert.alert("メモを削除します", "よろしいですか？", [
        {
          text: "キャンセル",
          onPress: () => {},
        },
        {
          text: "削除する",
          style: "destructive",
          onPress: () => {
            ref.delete().catch(() => {
              Alert.alert("削除に失敗しました");
            });
          },
        },
      ]);
    }
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => {
          navigation.navigate("MemoDetail", {
            id: item.id,
          });
        }}
      >
        <View>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>
            {item.bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>
            {dateToString(item.updatedAt)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => deleteMemo(item.id)}
          style={styles.memoDelete}
        >
          <Feather name="x" size={16} color="#B0B0B0" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

MemoList.propTypes = {
  memos: arrayOf(
    shape({
      id: string,
      bodyText: string,
      updatedAt: instanceOf(Date),
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    paddingVertical: 16,
    paddingHorizontal: 19,
  },

  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },

  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#666",
  },

  memoDelete: {
    padding: 8,
  },

  container: {
    flex: 1,
  },
});

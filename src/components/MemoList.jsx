import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { shape, string, instanceOf, arrayOf } from "prop-types";
import { dateToString } from "../utils";

export default function MemoList(props) {
  const navigation = useNavigation();
  const { memos } = props;

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
          onPress={() => {
            alert("削除しました");
          }}
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

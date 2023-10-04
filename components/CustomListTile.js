import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Avatar, ListItem} from "react-native-elements";
import {db} from "../firebase";

const CustomListTile = ({navigation, id, chatName, enterChat}) => {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot =>
        setChatMessages(snapshot.docs.map(doc => doc.data())),
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ListItem
      style={styles.container}
      id={id}
      onPress={() => enterChat(id, chatName)}
      key={id}>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoUrl ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: "800"}}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListTile;

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
});

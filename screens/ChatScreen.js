import {StyleSheet, View, KeyboardAvoidingView, Keyboard} from "react-native";
import React, {useLayoutEffect, useState} from "react";
import {ScrollView, TextInput} from "react-native-gesture-handler";
import {Avatar, Icon, Input, Text} from "react-native-elements";
import {SafeAreaView} from "react-native-safe-area-context";
import {db, auth} from "../firebase";
import {firebase} from "@react-native-firebase/firestore";

const ChatScreen = ({navigation, route}) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoUrl ||
                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
          />
          <Text style={{color: "white", marginLeft: 10}}>
            {route.params.chatName}
          </Text>
        </View>
      ),
    });
  }, [navigation, messages]);
  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: text,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoUrl: auth.currentUser.photoURL,
    });
    setText("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={"height"}
        keyboardVerticalOffset={100}>
        <>
          <ScrollView contentContainerStyle={{paddingTop: 15}}>
            {messages.map(({id, data}) =>
              data.email === auth.currentUser.email ? (
                <View style={styles.sender} key={id}>
                  <Avatar
                    position="absolute"
                    bottom={-15}
                    right={-5}
                    size={30}
                    rounded
                    source={{
                      uri: data.photoUrl,
                    }}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                </View>
              ) : (
                <View style={styles.reciever} key={id}>
                  <Avatar
                    position="absolute"
                    bottom={-15}
                    left={-5}
                    size={25}
                    rounded
                    source={{
                      uri: data.photoUrl,
                    }}
                  />

                  <Text style={styles.recieverText}>{data.message}</Text>
                  <Text>{data.displayName}</Text>
                </View>
              ),
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              placeholder="enter message"
              value={text}
              onChangeText={text => setText(text)}
              style={styles.inputContainer}
              onSubmitEditing={sendMessage}
            />

            <Icon
              name="sc-telegram"
              type="evilicon"
              size={42}
              onPress={sendMessage}
            />
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  inputContainer: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    borderRadius: 30,
    color: "grey",
    padding: 10,
    borderColor: "transparent",
  },
  sender: {
    backgroundColor: "#2C6BED",
    alignSelf: "flex-end",
    padding: 15,
    borderRadius: 20,
    marginRight: 15,
    maxWidth: "80%",
    position: "relative",
    marginBottom: 20,
  },
  senderText: {
    color: "#fff",
    fontWeight: 500,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  recieverText: {
    color: "black",
    fontWeight: 500,
    marginLeft: 10,
    marginBottom: 15,
  },
});

import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React, {useState, useEffect, useLayoutEffect} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView} from "react-native";
import CustomListTile from "../components/CustomListTile";
import {Avatar, Icon} from "react-native-elements";
import {auth, db} from "../firebase";

const HomeScreen = ({navigation}) => {
  const [chats, setchats] = useState([]);
  const logout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  useEffect(() => {
    const unsuscribe = db.collection("chats").onSnapshot(snapshot =>
      setchats(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })),
      ),
    );
    return unsuscribe;
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Signal",
      headerLeft: () => {
        return (
          <View style={{marginLeft: 15}}>
            <TouchableOpacity activeOpacity={0.5} onPress={logout}>
              <Avatar
                rounded
                style={{width: 30, height: 30}}
                source={{uri: auth.currentUser?.photoURL}}
              />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View style={{flexDirection: "row", gap: 10, marginRight: 15}}>
            <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
              <Icon name="pencil" type="evilicon" color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="camera" type="evilicon" color="white" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation]);
  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({id, data: {chatName}}) => (
          <CustomListTile
            id={id}
            chatName={chatName}
            key={id}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

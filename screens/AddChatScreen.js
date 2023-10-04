import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Button, Input} from 'react-native-elements';
import {db} from '../firebase';

const AddChatScreen = ({navigation}) => {
  const [chatName, setChatName] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add a Chat',
    });
  }, [navigation]);
  const createChat = async () => {
    await db.collection('chats').add({
      chatName: chatName,
    });
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a Chat name"
        value={chatName}
        onChangeText={text => setChatName(text)}
        type="text"
      />
      <Button title="Create" onPress={createChat} />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

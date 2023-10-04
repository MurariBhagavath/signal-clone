import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, {useState, useEffect} from "react";
import {Image} from "react-native-elements";
import {Input, Button} from "react-native-elements";
import {auth} from "../firebase";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Image
        source={require("../assets/signal.jpg")}
        style={{width: 150, height: 150}}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          type="email"
          autoFocus
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          onSubmitEditing={login}
        />
      </View>
      <Button containerStyle={styles.button} onPress={login} title="Login" />
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
        title="Register"
        type="outline"
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  inputContainer: {
    merginTop: 20,
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

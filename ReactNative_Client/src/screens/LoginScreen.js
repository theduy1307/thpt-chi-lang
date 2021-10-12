import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableHighlight,
} from "react-native";
import GradientButton from "react-native-gradient-buttons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../../assets/bg-01.png")} style={styles.background}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <TextInput style={styles.input} />
        <TextInput style={styles.input} />
        <GradientButton
          style={{ marginVertical: 8 }}
          text="Đăng nhập"
          gradientBegin="#a6ffa9"
          gradientEnd="#14b319"
          height={50}
          width={windowWidth * 0.8}
          radius={50}
          impact
          impactStyle="Light"
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  background: {
    height: windowHeight,
    width: windowWidth,
  },
  logo: {
    height: windowHeight * 0.07,
    width: null,
    aspectRatio: 2902 / 796,
  },
  input: {
    height: 50,
    width: windowWidth * 0.8,
    margin: 5,
    borderRadius: 50,
    padding: 10,
    backgroundColor: "#e0ffe7",
  },
});
export default LoginScreen;

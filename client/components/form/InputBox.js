import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const InputBox = ({
  inputTitle,
  autoComplete,
  keyboardType = "default",
  secureTextEntry = false,
  value,
  setValue,
  maxLength,
  numericOnly = false, // ✅ เพิ่ม prop เพื่อตรวจสอบว่าต้องการเฉพาะตัวเลขหรือไม่
}) => {
  return (
    <View>
      <Text style={styles.inputTitle}>{inputTitle}</Text>
      <TextInput
        style={styles.inputBox}
        autoCorrect={false}
        keyboardType={numericOnly ? "number-pad" : keyboardType} // ✅ ใช้ "number-pad" เมื่อกำหนดให้เป็นตัวเลข
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        maxLength={maxLength}
        onChangeText={(text) => {
          const filteredText = numericOnly ? text.replace(/[^0-9]/g, "") : text; // ✅ กรองเฉพาะตัวเลข
          setValue(filteredText);
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  inputTitle: {
    marginBottom: 3,
    fontSize: 15,
    color: "white",
    fontFamily: "Kanit",
  },
  inputBox: {
    height: 42,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    paddingLeft: 10,
    color: "#87CEFA",
    shadowColor: "#87CEFA",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default InputBox;

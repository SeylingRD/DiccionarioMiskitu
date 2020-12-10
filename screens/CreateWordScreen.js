import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import firebase from "../database/firebase";

const AddWordScreen = (props) => {
  const initalState = {
    palabraEspañol: "",
    palabraMiskito: "",
    significado: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, palabraEspañol) => {
    setState({ ...state, [palabraEspañol]: value });
  };

  const saveNewWord = async () => {
    if (state.palabraEspañol === "") {
      alert("please provide a name");
    } else {

      try {
        await firebase.db.collection("words").add({
          palabraEspañol: state.palabraEspañol,
          palabraMiskito: state.palabraMiskito,
          significado: state.significado,
        });

        props.navigation.navigate("WordList");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="palabra en español"
          onChangeText={(value) => handleChangeText(value, "palabraEspañol")}
          value={state.palabraEspañol}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="palabra en miskito"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "palabraMiskito")}
          value={state.palabraMiskito}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="significado"
          onChangeText={(value) => handleChangeText(value, "significado")}
          value={state.significado}
        />
      </View>

      <View style={styles.button}>
        <Button title="Agregar palabra" onPress={() => saveNewWord()} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddWordScreen;

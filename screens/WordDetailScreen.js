import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const WordDetailScreen = (props) => {
  const initialState = {
    id: "",
    palabraEspañol: "",
    palabraMiskito: "",
    significado: ""
  }

  const [word, setWord] = useState()
  const [loading, setLoading] = useState(true)

  const handleTextChange = (value, prop) => {
    setWord({ ...word, [prop]: value });
  };

  const getWordById = async (id) => {
    const dbRef = firebase.db.collection('words').doc(id)
    const doc = await dbRef.get()
    const word = doc.data()
    setWord({ ...word, id: doc.id })

    setLoading(false)
  };

  const deleteWord = async () => {
    setLoading(true)
    const dbRef = firebase.db.collection('words').doc(props.route.params.wordId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("WordList")
  }

  const openConfirmationAlert = () => {
    Alert.alert(
      "Eliminar palabra?",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteWord() },
        { text: "No", onPress: () => console.log(false)},
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateword = async () => {
    const dbRef = firebase.db.collection('words').doc(word.id);
    await dbRef.set({
      palabraEspañol: word.palabraEspañol,
      palabraMiskito: word.palabraMiskito,
      significado: word.significado,
    })
    setWord(initialState)
    props.navigation.navigate("wordList")
  }

  useEffect(() => {
    getWordById(props.route.params.wordId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ff0064" />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Palabra en español"
          autoCompleteType="palabraEspañol"
          style={styles.inputGroup}
          value={word.palabraEspañol}
          onChangeText={(value) => handleTextChange(value, "palabraEspañol")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="palabraMiskito"
          placeholder="Palabra en Miskito"
          style={styles.inputGroup}
          value={word.palabraMiskito}
          onChangeText={(value) => handleTextChange(value, "palabraMiskito")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Significado"
          autoCompleteType="significado"
          style={styles.inputGroup}
          value={word.significado}
          onChangeText={(value) => handleTextChange(value, "")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateword()} color="#ff0064" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default  WordDetailScreen;

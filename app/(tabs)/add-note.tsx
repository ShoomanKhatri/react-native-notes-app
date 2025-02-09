import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

export default function AddNoteScreen() {
  const [note, setNote] = useState("");
  const router = useRouter();

  const saveNote = async () => {
    if (note.trim().length > 0) {
      const existingNotes = JSON.parse(
        (await AsyncStorage.getItem("notes")) || "[]"
      ); // Default to empty array
      const updatedNotes = [...existingNotes, note];
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
      router.back();
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <TextInput
        placeholder="Write your note..."
        value={note}
        onChangeText={setNote}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
      />

      <Pressable
        onPress={saveNote}
        style={{
          backgroundColor: "green",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Save Note</Text>
      </Pressable>
    </View>
  );
}

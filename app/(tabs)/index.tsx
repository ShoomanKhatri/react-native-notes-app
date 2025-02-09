import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [notes, setNotes] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const router = useRouter();

  const loadNotes = async () => {
    const savedNotes = await AsyncStorage.getItem("notes");
    setNotes(savedNotes ? JSON.parse(savedNotes) : []);
  };

  // Auto-refresh notes when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  // Delete note
  const deleteNote = async (index: number) => {
    Alert.alert("Delete Note", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          const updatedNotes = notes.filter((_, i) => i !== index);
          await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
          setNotes(updatedNotes); // Update UI
        },
        style: "destructive",
      },
    ]);
  };

  // Open edit modal
  const openEditModal = (index: number, text: string) => {
    setSelectedNote(index);
    setEditedText(text);
    setModalVisible(true);
  };

  const cancelUpdate = () => {
    setSelectedNote(null);
    setEditedText("");
    setModalVisible(false);
  };

  // Update note
  const updateNote = async () => {
    if (editedText.trim().length === 0) return;

    if (selectedNote !== null) {
      const updatedNotes = [...notes];
      updatedNotes[selectedNote] = editedText;
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNotes(updatedNotes); // Update UI
      setModalVisible(false);
    } else {
      // Handle the case where selectedNote is null
      console.error("Selected note is null");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
              marginBottom: 5,
              backgroundColor: "#ddd",
              borderRadius: 5,
            }}
          >
            <Text>{item}</Text>
            <View style={{ flexDirection: "row", gap: 15 }}>
              {/* Edit Button */}
              <TouchableOpacity onPress={() => openEditModal(index, item)}>
                <Ionicons name="pencil" size={24} color="orange" />
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity onPress={() => deleteNote(index)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Add Note Button */}
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: "green",
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => router.push("/add-note")}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Add Note</Text>
      </TouchableOpacity>

      {/* Edit Note Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
          >
            <TextInput
              value={editedText}
              onChangeText={setEditedText}
              style={{
                borderWidth: 1,
                padding: 10,
                marginBottom: 10,
                borderRadius: 5,
              }}
            />
            <TouchableOpacity
              onPress={updateNote}
              style={{ backgroundColor: "green", padding: 10, borderRadius: 5 }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Update Note
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={cancelUpdate}
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 5,
                marginTop: 5,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

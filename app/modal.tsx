import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNotes } from '../hooks/useNotes';

export default function ModalScreen() {
  const { noteId } = useLocalSearchParams<{ noteId?: string }>();
  const { getNoteById, createNote, updateNote, deleteNote } = useNotes();

  const isEditing = !!noteId;
  const existingNote = noteId ? getNoteById(noteId) : undefined;

  const [title, setTitle] = useState(existingNote?.title ?? '');
  const [description, setDescription] = useState(existingNote?.description ?? '');

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setDescription(existingNote.description);
    }
  }, [existingNote]);

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (isEditing && noteId) {
      await updateNote(noteId, { title, description });
    } else {
      await createNote({ title, description });
    }

    router.back();
  };

  const handleDelete = async () => {
    if (!noteId) return;

    Alert.alert('Delete Note?', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteNote(noteId);
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>{isEditing ? 'Update' : 'Create'}</Text>
      </TouchableOpacity>

      {isEditing && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash" size={20} color="#fff" />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { marginTop: 12, fontWeight: 'bold', color:'white' },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  textArea: { height: 120 },
  saveButton: {
    backgroundColor: '#007aff',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  deleteText: { color: '#fff', marginLeft: 8 },
});

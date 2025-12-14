import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Note, useNotes } from '../../hooks/useNotes';

// --- Component to render a single note item ---
const NoteItem = ({ note, onPress }: { note: Note; onPress: () => void }) => {
  const dateStr = new Date(note.date_updated).toLocaleDateString();

  return (
    <TouchableOpacity style={styles.noteItemContainer} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.noteTitle} numberOfLines={1}>{note.title}</Text>
        <Text style={styles.noteDescription} numberOfLines={2}>
          {note.description}
        </Text>
      </View>
      <Text style={styles.noteDate}>{dateStr}</Text>
    </TouchableOpacity>
  );
};

export default function NotesScreen() {
  const { notes } = useNotes();
  const router = useRouter();

  const handleNotePress = (id: string) => {
    router.push({ pathname: '/modal', params: { noteId: id } });
  };

  const handleAddPress = () => {
    router.push('/modal');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Notes ({notes.length})</Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem note={item} onPress={() => handleNotePress(item.id)} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notes yet.</Text>
        }
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  noteItemContainer: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: { flex: 1, marginRight: 10 },
  noteTitle: { fontWeight: 'bold', fontSize: 16 },
  noteDescription: { color: '#666' },
  noteDate: { fontSize: 12, color: '#999' },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007aff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { textAlign: 'center', marginTop: 40 },
});

import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

  const handleProfilePress = () => {
    // Navigate to your profile screen
    router.push('/profile'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Header with Profile --- */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Notes ({notes.length})</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem note={item} onPress={() => handleNotePress(item.id)} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notes yet.</Text>
        }
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' }, // Added background for better contrast with white text
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
  },
  header: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  profileButton: {
    padding: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for the floating button
  },
  noteItemContainer: {
    backgroundColor: '#ffffff',
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  textContainer: { flex: 1, marginRight: 10 },
  noteTitle: { fontWeight: 'bold', fontSize: 16, color: '#000' },
  noteDescription: { color: '#666', marginTop: 4 },
  noteDate: { fontSize: 12, color: '#999' },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007aff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#ccc' },
});
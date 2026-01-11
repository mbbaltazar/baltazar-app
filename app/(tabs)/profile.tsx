import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  // Mock data - in a real app, you'd get this from an Auth context or useNotes hook
  const user = {
    name: 'Tere Velasco',
    email: 'terevelasco@gmail.com',
    notesCount: 4,
    joinedDate: 'January 2025'
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} /> {/* Spacer to center the title */}
      </View>

      {/* Profile Info Section */}
      <View style={styles.profileSection}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="person" size={60} color="#007aff" />
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.notesCount}</Text>
          <Text style={styles.statLabel}>Notes</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>2025</Text>
          <Text style={styles.statLabel}>Joined</Text>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menuSection}>
        <ProfileMenuItem icon="settings-outline" title="Account Settings" />
        <ProfileMenuItem icon="notifications-outline" title="Notifications" />
        <ProfileMenuItem icon="lock-closed-outline" title="Privacy & Security" />
        <ProfileMenuItem 
          icon="log-out-outline" 
          title="Log Out" 
          textColor="#ff4444" 
          hideChevron 
        />
      </View>
    </ScrollView>
  );
}

// Reusable Menu Item Component
const ProfileMenuItem = ({ 
  icon, 
  title, 
  textColor = '#fff', 
  hideChevron = false 
}: { 
  icon: any; 
  title: string; 
  textColor?: string;
  hideChevron?: boolean;
}) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuLeft}>
      <Ionicons name={icon} size={22} color={textColor} />
      <Text style={[styles.menuText, { color: textColor }]}>{title}</Text>
    </View>
    {!hideChevron && <Ionicons name="chevron-forward" size={20} color="#666" />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    padding: 8,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userEmail: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#333',
  },
  menuSection: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e1e',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
  },
});
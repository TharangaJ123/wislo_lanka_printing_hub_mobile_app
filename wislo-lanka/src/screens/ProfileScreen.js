import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { COLORS } from '../theme/colors';

const items = [
  'My Ads',
  'Saved Ads',
  'Payments',
  'Settings',
  'Notifications',
  'Language',
];

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>WL</Text>
        </View>
        <View>
          <Text style={styles.name}>Wislo Lanka User</Text>
          <Text style={styles.meta}>Joined 2025 • Verified</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account</Text>
        {items.map((item) => (
          <Pressable key={item} style={styles.row}>
            <Text style={styles.rowText}>{item}</Text>
            <Text style={styles.rowAction}>›</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 18,
  },
  name: {
    fontWeight: '800',
    fontSize: 18,
    color: COLORS.text,
  },
  meta: {
    color: COLORS.muted,
  },
  card: {
    backgroundColor: COLORS.light,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1EAF5',
    padding: 12,
  },
  cardTitle: {
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4ECF5',
  },
  rowText: {
    color: COLORS.text,
    fontWeight: '700',
  },
  rowAction: {
    color: COLORS.muted,
    fontWeight: '700',
  },
});

export default ProfileScreen;

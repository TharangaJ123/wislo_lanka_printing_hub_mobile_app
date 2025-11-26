import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../theme/colors';
import TopBar from '../components/TopBar';

const MessagesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBar title="Messages" onBack={() => navigation?.goBack()} />
      <View style={styles.body}>
        <Text style={styles.subtitle}>Chat with buyers and sellers will appear here.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MessagesScreen;

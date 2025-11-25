import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { COLORS } from '../theme/colors';

const categories = [
  'Used Machines',
  'Supplies',
  'Companies',
  'Academy Teachers',
  'Jobs',
  'Services',
  'Design & Prepress',
  'Finishing',
  'Training',
  'Packaging',
  'Spare Parts',
  'Maintenance',
];

const CategoriesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>
      <ScrollView contentContainerStyle={styles.grid}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={styles.card}
            onPress={() => navigation.navigate('AdsList', { category: cat })}
          >
            <View style={styles.icon}>
              <Text style={styles.iconText}>{cat[0]}</Text>
            </View>
            <Text style={styles.label}>{cat}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 14,
    gap: 12,
  },
  card: {
    width: '47%',
    backgroundColor: COLORS.light,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0E9F5',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#D5E5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  label: {
    textAlign: 'center',
    fontWeight: '700',
    color: COLORS.text,
  },
});

export default CategoriesScreen;

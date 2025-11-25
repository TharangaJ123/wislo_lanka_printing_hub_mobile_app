import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
} from 'react-native';
import { COLORS } from '../theme/colors';
import PrimaryButton from '../components/PrimaryButton';

const categories = [
  { id: 'cat1', label: 'Used Machines' },
  { id: 'cat2', label: 'Supplies' },
  { id: 'cat3', label: 'Companies' },
  { id: 'cat4', label: 'Academy Teachers' },
  { id: 'cat5', label: 'Jobs' },
  { id: 'cat6', label: 'Services' },
];

const featuredAds = [
  { id: 'f1', title: 'Heidelberg SM 74', price: 'Rs 12,500,000', location: 'Colombo', time: '2h' },
  { id: 'f2', title: 'Konica Minolta C3080', price: 'Rs 4,100,000', location: 'Kandy', time: '5h' },
  { id: 'f3', title: 'Mimaki JV33', price: 'Rs 1,900,000', location: 'Galle', time: '1d' },
];

const recentAds = [
  { id: 'r1', title: 'Polar 92 Cutter', price: 'Rs 3,200,000', location: 'Colombo 03', time: 'Just now' },
  { id: 'r2', title: 'Ricoh Pro 8310', price: 'Rs 2,600,000', location: 'Negombo', time: '15m' },
  { id: 'r3', title: 'Print Operator (Night)', price: 'Rs 95,000', location: 'Maharagama', time: '30m' },
  { id: 'r4', title: 'Foil Stamping Service', price: 'Contact for price', location: 'Online', time: '2h' },
];

const CategoryCard = ({ label, onPress }) => (
  <Pressable style={styles.categoryCard} onPress={onPress}>
    <View style={styles.categoryIcon}>
      <Text style={styles.categoryInitial}>{label[0]}</Text>
    </View>
    <Text style={styles.categoryLabel}>{label}</Text>
  </Pressable>
);

const AdCard = ({ item, compact, onPress }) => (
  <Pressable style={[styles.adCard, compact && styles.adCardCompact]} onPress={onPress}>
    <View style={styles.adImage} />
    <View style={{ flex: 1 }}>
      <Text style={styles.adTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.adPrice}>{item.price}</Text>
      <Text style={styles.adMeta}>{item.location} • {item.time}</Text>
    </View>
  </Pressable>
);

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.searchBar}>
          <TextInput placeholder="Search printing machines, supplies, jobs..." placeholderTextColor="#9AB1C8" style={styles.searchInput} />
        </View>

        <Text style={styles.sectionTitle}>Browse Categories</Text>
        <View style={styles.categoryGrid}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              label={cat.label}
              onPress={() => navigation.navigate('AdsList', { category: cat.label })}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Featured Ads</Text>
        <FlatList
          data={featuredAds}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <AdCard
              item={item}
              onPress={() => navigation.navigate('AdDetails', { ad: item })}
              compact
            />
          )}
          contentContainerStyle={{ paddingRight: 12 }}
        />

        <Text style={styles.sectionTitle}>Recent Ads</Text>
        <View style={styles.recentList}>
          {recentAds.map((item) => (
            <AdCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate('AdDetails', { ad: item })}
            />
          ))}
        </View>
      </ScrollView>

      <PrimaryButton
        label="Post Ad"
        onPress={() => navigation.navigate('PostAd')}
        style={styles.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 16,
    paddingBottom: 90,
  },
  searchBar: {
    backgroundColor: COLORS.light,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#DFE9F5',
    marginBottom: 16,
  },
  searchInput: {
    color: COLORS.text,
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 6,
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 10,
  },
  categoryCard: {
    width: '30%',
    minWidth: 100,
    backgroundColor: COLORS.light,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E4ECF5',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#DFE9F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryInitial: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  categoryLabel: {
    textAlign: 'center',
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 13,
  },
  adCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E4ECF5',
    marginBottom: 12,
    gap: 12,
  },
  adCardCompact: {
    width: 240,
    marginBottom: 0,
  },
  adImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#CFE0F4',
  },
  adTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  adPrice: {
    color: COLORS.primary,
    fontWeight: '800',
    marginBottom: 4,
  },
  adMeta: {
    color: COLORS.muted,
    fontSize: 12,
  },
  recentList: {
    marginBottom: 12,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    borderRadius: 16,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;

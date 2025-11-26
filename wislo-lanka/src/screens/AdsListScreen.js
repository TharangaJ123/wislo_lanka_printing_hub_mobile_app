import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { COLORS } from '../theme/colors';

const ads = [
  { id: 'a1', title: 'Heidelberg SM 74', price: 'Rs 12,500,000', location: 'Colombo', time: '2h' },
  { id: 'a2', title: 'Used Plate Processor', price: 'Rs 450,000', location: 'Gampaha', time: '4h' },
  { id: 'a3', title: 'Offset Operator - Day Shift', price: 'Rs 120,000', location: 'Kelaniya', time: '6h' },
  { id: 'a4', title: 'Ricoh Pro 8200', price: 'Rs 2,300,000', location: 'Kandy', time: '8h' },
  { id: 'a5', title: 'Packaging Design Service', price: 'Contact for price', location: 'Remote', time: '1d' },
];

const filters = ['Location', 'Price Range', 'Sort'];

const AdsListScreen = ({ navigation, route }) => {
  const category = route?.params?.category;
  const breadcrumb = category ? `Home / Ads / ${category}` : 'Home / Ads';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
            <Text style={styles.backChip}>{'‹'} Back</Text>
          </Pressable>
          <Text style={styles.breadcrumb}>{breadcrumb}</Text>
        </View>
        <Text style={styles.headerTitle}>{category || 'All Ads'}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.filterRow}>
          {filters.map((f) => (
            <Pressable key={f} style={styles.filterChip}>
              <Text style={styles.filterText}>{f}</Text>
            </Pressable>
          ))}
        </View>

        {ads.map((ad) => (
          <Pressable
            key={ad.id}
            style={styles.card}
            onPress={() => navigation.navigate('AdDetails', { ad })}
          >
            <View style={styles.cardImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{ad.title}</Text>
              <Text style={styles.price}>{ad.price}</Text>
              <Text style={styles.meta}>{ad.location} • {ad.time}</Text>
            </View>
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  backChip: {
    color: COLORS.primary,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: '800',
    fontSize: 13,
    overflow: 'hidden',
  },
  breadcrumb: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '700',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },
  content: {
    padding: 14,
    gap: 12,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
  },
  filterChip: {
    backgroundColor: COLORS.light,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E1EAF5',
  },
  filterText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 12,
  },
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: COLORS.light,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E4ECF5',
  },
  cardImage: {
    width: 96,
    height: 96,
    borderRadius: 12,
    backgroundColor: '#D0E2F7',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  price: {
    color: COLORS.primary,
    fontWeight: '800',
    marginBottom: 4,
  },
  meta: {
    color: COLORS.muted,
    fontSize: 12,
  },
});

export default AdsListScreen;

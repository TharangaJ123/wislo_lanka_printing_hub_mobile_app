import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import { COLORS } from '../theme/colors';
import PrimaryButton from '../components/PrimaryButton';
import TopBar from '../components/TopBar';

const gallery = ['img1', 'img2', 'img3'];
const similarAds = [
  { id: 's1', title: 'Mimaki JV33', price: 'Rs 1,900,000', location: 'Galle', time: '1d' },
  { id: 's2', title: 'Paper Supply Deal', price: 'Rs 320,000', location: 'Kegalle', time: '3h' },
  { id: 's3', title: 'Binding Operator', price: 'Rs 80,000', location: 'Matara', time: '5h' },
];

const AdDetailsScreen = ({ route, navigation }) => {
  const ad = route?.params?.ad || {
    title: 'Heidelberg SM 74',
    price: 'Rs 12,500,000',
    location: 'Colombo',
    time: '2h',
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TopBar
        title="Ad Details"
        onBack={() => navigation?.goBack()}
      />

      <View style={styles.slider}>
        <FlatList
          data={gallery}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <View style={styles.slide} />}
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{ad.title}</Text>
        <Text style={styles.price}>{ad.price}</Text>
        <Text style={styles.meta}>{ad.location} • {ad.time}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.sectionText}>
          Well-maintained unit, single owner. Includes service history, spare rollers, and operator
          training. Ready for inspection in Colombo.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seller</Text>
        <View style={styles.sellerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>WL</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sellerName}>Wislo Lanka Dealer</Text>
            <Text style={styles.sellerMeta}>Member since 2022 • Verified</Text>
          </View>
          <Pressable>
            <Text style={styles.viewProfile}>View</Text>
          </Pressable>
        </View>
        <View style={styles.actionsRow}>
          <PrimaryButton label="Call" onPress={() => {}} style={styles.actionBtn} />
          <PrimaryButton label="WhatsApp" onPress={() => {}} variant="outline" style={styles.actionBtn} />
          <PrimaryButton label="Chat" onPress={() => {}} variant="outline" style={styles.actionBtn} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Similar Ads</Text>
        {similarAds.map((item) => (
          <View key={item.id} style={styles.similarCard}>
            <View style={styles.similarImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.similarTitle}>{item.title}</Text>
              <Text style={styles.similarPrice}>{item.price}</Text>
              <Text style={styles.similarMeta}>{item.location} • {item.time}</Text>
            </View>
          </View>
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
    paddingBottom: 32,

  },
  slider: {
    height: 240,
    backgroundColor: COLORS.light,
  },
  slide: {
    width: '100%',
    height: 240,
    backgroundColor: '#CFE0F4',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 4,
  },
  meta: {
    color: COLORS.muted,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  sectionText: {
    color: COLORS.muted,
    lineHeight: 20,
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.light,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E1EAF5',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D6E3F1',
  },
  avatarText: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  sellerName: {
    fontWeight: '800',
    color: COLORS.text,
  },
  sellerMeta: {
    color: COLORS.muted,
    fontSize: 12,
  },
  viewProfile: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  actionBtn: {
    flex: 1,
  },
  similarCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: COLORS.light,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E1EAF5',
    marginBottom: 10,
  },
  similarImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#D4E4F7',
  },
  similarTitle: {
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  similarPrice: {
    color: COLORS.primary,
    fontWeight: '800',
    marginBottom: 2,
  },
  similarMeta: {
    color: COLORS.muted,
    fontSize: 12,
  },
});

export default AdDetailsScreen;

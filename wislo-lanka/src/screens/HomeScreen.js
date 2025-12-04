import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
  Modal,
  SafeAreaView,
  Animated,
  Image,
} from 'react-native';
import { COLORS } from '../theme/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const HERO_HEIGHT = 90;
const locations = [
  'All',
  'Colombo',
  'Kandy',
  'Galle',
  'Negombo',
  'Jaffna',
  'Kurunegala',
  'Gampaha',
  'Matara',
  'Kegalle',
  'Anuradhapura',
];
const priceRanges = ['All', 'Under Rs 250,000', 'Rs 250k - 1M', 'Rs 1M - 5M', 'Rs 5M+'];
const posterTypes = ['All posters', 'Members', 'Authorized Agent', 'Non-members'];
const sortOptions = ['Latest', 'Price: Low to High', 'Price: High to Low', 'Nearest'];

const categories = [
  { id: 'cat1', label: 'Machines' },
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
      <Text style={styles.adMeta}>{item.location} | {item.time}</Text>
    </View>
  </Pressable>
);

const HomeScreen = ({ navigation }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [selectedPosterType, setSelectedPosterType] = useState('All posters');
  const [includePromoted, setIncludePromoted] = useState(false);
  const [sortBy, setSortBy] = useState('Latest');
  const [fabAnim] = useState(new Animated.Value(0));
  const totalAds = featuredAds.length + recentAds.length;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(fabAnim, {
          toValue: -6,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(fabAnim, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [fabAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.heroWrapper}>
        <View style={styles.heroCard}>
          <View>
            <View style={styles.heroTitleRow}>
              <Image source={require('../../assets/logo/logo.png')} style={styles.heroLogo} />
              <Text style={styles.heroTitle}>
                <Text style={styles.heroTitlePrimary}>Print </Text>
                <Text style={styles.heroTitleHighlight}>Hub</Text>
              </Text>
              <View style={styles.heroTitleSpacer} />
              <Text style={styles.heroCount}>{totalAds} ads</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          <Pressable
            style={[styles.filterPill, styles.filterPillActive]}
            onPress={() => setActiveDropdown('location')}
          >
            <Text style={[styles.filterText, styles.filterTextActive]} numberOfLines={1}>
              {selectedLocation}
            </Text>
            {selectedLocation !== 'All' && (
              <Ionicons name="close" size={14} color={COLORS.primary} />
            )}
            <Ionicons name="chevron-down" size={16} color={COLORS.primary} />
          </Pressable>

          <Pressable style={styles.filterPill} onPress={() => setActiveDropdown('category')}>
            <Text style={styles.filterText}>{selectedCategory === 'All' ? 'Category' : selectedCategory}</Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.muted} />
          </Pressable>

          <Pressable style={styles.filterPill} onPress={() => setActiveDropdown('price')}>
            <Text style={styles.filterText}>{selectedPrice === 'All' ? 'Price' : selectedPrice}</Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.muted} />
          </Pressable>

          <Pressable
            style={[styles.filterPill, styles.filterIconPill]}
            onPress={() => setShowFiltersModal(true)}
          >
            <Ionicons name="options-outline" size={18} color={COLORS.primary} />
          </Pressable>
        </ScrollView>

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

      <Animated.View
        style={[styles.postFabWrap, { transform: [{ translateY: fabAnim }] }]}
      >
        <Pressable
          style={styles.postFab}
          onPress={() => navigation.navigate('PostAd')}
        >
          <Ionicons name="add" size={28} color="#7A4B00" />
        </Pressable>
        <Text style={styles.postFabLabel}>Post ad</Text>
      </Animated.View>

      <Modal
        visible={!!activeDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveDropdown(null)}
      >
        <Pressable style={styles.dropdownOverlay} onPress={() => setActiveDropdown(null)}>
          <Pressable
            style={styles.dropdownCard}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>
                {activeDropdown === 'location' && 'Select Location'}
                {activeDropdown === 'category' && 'Select Category'}
                {activeDropdown === 'price' && 'Select Price'}
              </Text>
              <Pressable onPress={() => setActiveDropdown(null)}>
                <Ionicons name="close" size={18} color={COLORS.muted} />
              </Pressable>
            </View>
            <ScrollView style={{ maxHeight: 280 }} showsVerticalScrollIndicator={false}>
              {activeDropdown === 'location' &&
                locations.map((loc) => (
                  <Pressable
                    key={loc}
                    style={styles.dropdownRow}
                    onPress={() => {
                      setSelectedLocation(loc);
                      setActiveDropdown(null);
                    }}
                  >
                    <Text style={styles.dropdownText}>{loc}</Text>
                    {selectedLocation === loc && (
                      <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
                    )}
                  </Pressable>
                ))}
              {activeDropdown === 'category' &&
                categories.map((cat) => (
                  <Pressable
                    key={cat.id}
                    style={styles.dropdownRow}
                    onPress={() => {
                      setSelectedCategory(cat.label);
                      setActiveDropdown(null);
                    }}
                  >
                    <Text style={styles.dropdownText}>{cat.label}</Text>
                    {selectedCategory === cat.label && (
                      <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
                    )}
                  </Pressable>
                ))}
              {activeDropdown === 'price' &&
                priceRanges.map((range) => (
                  <Pressable
                    key={range}
                    style={styles.dropdownRow}
                    onPress={() => {
                      setSelectedPrice(range);
                      setActiveDropdown(null);
                    }}
                  >
                    <Text style={styles.dropdownText}>{range}</Text>
                    {selectedPrice === range && (
                      <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
                    )}
                  </Pressable>
                ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={showFiltersModal}
        animationType="slide"
        presentationStyle="fullScreen"
        statusBarTranslucent
        onRequestClose={() => setShowFiltersModal(false)}
      >
        <SafeAreaView style={styles.fullModalWrap}>
          <View style={styles.fullModal}>
            <View style={styles.fullModalHeader}>
              <Text style={styles.fullModalTitle}>Filters</Text>
              <Pressable onPress={() => setShowFiltersModal(false)}>
                <Ionicons name="close" size={22} color={COLORS.text} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Location</Text>
                <View style={styles.tagRow}>
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{selectedLocation}</Text>
                    {selectedLocation !== 'All' && (
                      <Pressable onPress={() => setSelectedLocation('All')}>
                        <Ionicons name="close" size={14} color={COLORS.primary} />
                      </Pressable>
                    )}
                  </View>
                  <Pressable onPress={() => setActiveDropdown('location')}>
                    <Text style={styles.linkText}>Change Location</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Category</Text>
                <Pressable onPress={() => setActiveDropdown('category')}>
                  <Text style={styles.linkText}>
                    {selectedCategory === 'All' ? 'Select Category' : selectedCategory}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Type of poster</Text>
                {posterTypes.map((type) => (
                  <Pressable
                    key={type}
                    style={styles.radioRow}
                    onPress={() => setSelectedPosterType(type)}
                  >
                    <View style={[styles.radioOuter, selectedPosterType === type && styles.radioOuterActive]}>
                      {selectedPosterType === type && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.dropdownText}>{type}</Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Promoted Listings</Text>
                <Pressable
                  style={styles.checkboxRow}
                  onPress={() => setIncludePromoted((prev) => !prev)}
                >
                  <View style={[styles.checkbox, includePromoted && styles.checkboxChecked]}>
                    {includePromoted && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
                  </View>
                  <Text style={styles.dropdownText}>Urgent</Text>
                </Pressable>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Sort by</Text>
                {sortOptions.map((opt) => (
                  <Pressable
                    key={opt}
                    style={styles.dropdownRow}
                    onPress={() => setSortBy(opt)}
                  >
                    <Text style={styles.dropdownText}>{opt}</Text>
                    {sortBy === opt && (
                      <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
                    )}
                  </Pressable>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <Pressable
                style={[styles.footerButton, styles.footerButtonOutline]}
                onPress={() => {
                  setSelectedLocation('All');
                  setSelectedCategory('All');
                  setSelectedPrice('All');
                  setSelectedPosterType('All posters');
                  setIncludePromoted(false);
                  setSortBy('Latest');
                }}
              >
                <Text style={[styles.footerButtonText, styles.footerButtonTextOutline]}>Reset all</Text>
              </Pressable>
              <Pressable
                style={[styles.footerButton, styles.footerButtonPrimary]}
                onPress={() => setShowFiltersModal(false)}
              >
                <Text style={styles.footerButtonText}>Show ads</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  heroWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    zIndex: 5,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: HERO_HEIGHT + 24,
    paddingBottom: 90,
  },
  heroCard: {
    backgroundColor: COLORS.primary,
    padding: 12,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    height: HERO_HEIGHT,
    borderWidth: 1,
    borderColor: '#155ea3',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    width: '100%',
  },
  heroTextWrap: {
    position: 'relative',
    zIndex: 3,
    width: '100%',
    paddingVertical: 4,
    gap: 8,
    alignItems: 'flex-start',
  },
  heroTitleBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 12,
    padding: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    width: '100%',
    alignItems: 'flex-start',
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  heroTitleSpacer: {
    flex: 1,
  },
  heroLogo: {
    width: 36,
    height: 36,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.18)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroCount: {
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#e6f3ff',
    fontSize: 13,
    fontWeight: '700',
  },
  heroTitlePrimary: {
    color: COLORS.white,
  },
  heroTitleHighlight: {
    color: '#b9e3ff',
    textShadowColor: 'rgba(0, 0, 0, 0.22)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  heroTitleAccent: {
    marginTop: 4,
    width: 64,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
  filterRow: {
    paddingRight: 4,
    gap: 10,
    marginBottom: 14,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D8E6F3',
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  filterPillActive: {
    backgroundColor: COLORS.white,
    borderColor: 'rgba(30, 115, 190, 0.45)',
  },
  filterIconPill: {
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: 'rgba(30, 115, 190, 0.5)',
  },
  filterText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  filterTextActive: {
    color: COLORS.primaryDark,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 16,
    paddingTop: HERO_HEIGHT + 28,
  },
  dropdownCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E4ECF5',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF3F9',
  },
  dropdownText: {
    fontSize: 14,
    color: COLORS.text,
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
  postFabWrap: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    alignItems: 'center',
  },
  postFab: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#64c6f3ff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  postFabLabel: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  fullModalWrap: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
  },
  fullModal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  fullModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fullModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  filterSection: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF3F9',
    gap: 10,
  },
  filterSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(30, 115, 190, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(30, 115, 190, 0.35)',
  },
  chipText: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#C2D4E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#C2D4E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    paddingBottom: 18,
  },
  footerButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  footerButtonOutline: {
    borderColor: COLORS.primary,
  },
  footerButtonPrimary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  footerButtonText: {
    fontWeight: '800',
    color: COLORS.white,
  },
  footerButtonTextOutline: {
    color: COLORS.primary,
  },
});

export default HomeScreen;

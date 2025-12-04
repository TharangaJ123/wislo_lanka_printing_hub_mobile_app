import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { COLORS } from '../theme/colors';
import TopBar from '../components/TopBar';

const ads = [
  { id: 'a1', title: 'Heidelberg SM 74', price: 'Rs 12,500,000', location: 'Colombo', time: '2h' },
  { id: 'a2', title: 'Used Plate Processor', price: 'Rs 450,000', location: 'Gampaha', time: '4h' },
  { id: 'a3', title: 'Offset Operator - Day Shift', price: 'Rs 120,000', location: 'Kelaniya', time: '6h' },
  { id: 'a4', title: 'Ricoh Pro 8200', price: 'Rs 2,300,000', location: 'Kandy', time: '8h' },
  { id: 'a5', title: 'Packaging Design Service', price: 'Contact for price', location: 'Remote', time: '1d' },
];

const jobTabs = ['Hiring', 'Wanted'];
const machineTabs = ['Brand New', 'Used Machines'];
const machineTypeFilters = ['Machines', 'Tools', 'Parts', 'Accessories'];
const suppliesFilters = ['Inks', 'Frames', 'Chemicals', 'Films', 'Papers', 'Boxes', 'Stickers'];

const hiringAds = [
  { id: 'h1', title: 'Press Operator - Heidelberg XL75', price: 'Rs 165,000 (full-time)', location: 'Colombo 05', time: '1h' },
  { id: 'h2', title: 'Bindery Supervisor - Night Shift', price: 'Rs 140,000 (shift)', location: 'Kelaniya', time: '3h' },
  { id: 'h3', title: 'Digital Press Operator (Xerox)', price: 'Rs 120,000 (contract)', location: 'Gampaha', time: 'Today' },
];

const wantedAds = [
  { id: 'w1', title: 'Graphic Designer seeking in-house role', price: 'Expected Rs 95,000', location: 'Dehiwala', time: '1d' },
  { id: 'w2', title: 'Prepress Specialist open to freelance', price: 'Project based', location: 'Remote / Colombo', time: '2d' },
  { id: 'w3', title: 'Experienced Machine Helper available', price: 'Rs 75,000 (negotiable)', location: 'Gampaha', time: '3d' },
];

const brandNewMachineAds = [
  { id: 'bn1', title: 'Brand New Heidelberg Speedmaster CX 75', price: 'Rs 89,000,000', location: 'Colombo', time: 'Just now' },
  { id: 'bn2', title: 'Konica Minolta AccurioPress C7100 (New)', price: 'Rs 18,500,000', location: 'Gampaha', time: '1h' },
  { id: 'bn3', title: 'New Polar 92 N Cutter', price: 'Rs 12,900,000', location: 'Kandy', time: '3h' },
];

const usedMachineAds = [
  { id: 'um1', title: 'Used Ryobi 524 HX (2017)', price: 'Rs 7,500,000', location: 'Galle', time: '2h' },
  { id: 'um2', title: 'Heidelberg SM 52-4 (2008)', price: 'Rs 9,800,000', location: 'Negombo', time: '5h' },
  { id: 'um3', title: 'Second-hand CTP Platesetter (Screen)', price: 'Rs 2,900,000', location: 'Matara', time: '1d' },
];

const filters = ['Location', 'Price Range', 'Sort'];

const AdsListScreen = ({ navigation, route }) => {
  const [activeJobTab, setActiveJobTab] = useState(jobTabs[0]);
  const [activeMachineTab, setActiveMachineTab] = useState(machineTabs[0]);
  const [activeMachineType, setActiveMachineType] = useState(machineTypeFilters[0]);
  const [activeSupplyType, setActiveSupplyType] = useState(suppliesFilters[0]);
  const category = route?.params?.category;
  const breadcrumb = category ? `Home / Ads / ${category}` : 'Home / Ads';
  const title = category || 'Ads';
  const isJobsCategory = category?.toLowerCase() === 'jobs';
  const isMachinesCategory = category?.toLowerCase() === 'machines';
  const isSuppliesCategory = category?.toLowerCase() === 'supplies';
  const isCompaniesCategory = category?.toLowerCase() === 'companies';
  const displayFilters = isCompaniesCategory ? filters.filter((f) => f !== 'Price Range') : filters;
  const displayAds = isJobsCategory
    ? activeJobTab === 'Hiring'
      ? hiringAds
      : wantedAds
    : isMachinesCategory
      ? activeMachineTab === 'Brand New'
        ? brandNewMachineAds
        : usedMachineAds
      : ads;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TopBar
          title={title}
          breadcrumb={breadcrumb}
          onBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {displayFilters.map((f) => (
            <Pressable key={f} style={styles.filterChip}>
              <Text style={styles.filterText}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {isJobsCategory && (
          <View style={styles.jobsTabsRow}>
            {jobTabs.map((tab) => {
              const active = tab === activeJobTab;
              return (
                <Pressable
                  key={tab}
                  style={[styles.jobTab, active && styles.jobTabActive]}
                  onPress={() => setActiveJobTab(tab)}
                >
                  <Text style={[styles.jobTabText, active && styles.jobTabTextActive]}>
                    {tab}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        {isMachinesCategory && (
          <>
            <View style={styles.jobsTabsRow}>
              {machineTabs.map((tab) => {
                const active = tab === activeMachineTab;
                return (
                  <Pressable
                    key={tab}
                    style={[styles.jobTab, active && styles.jobTabActive]}
                    onPress={() => setActiveMachineTab(tab)}
                  >
                    <Text style={[styles.jobTabText, active && styles.jobTabTextActive]}>
                      {tab}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterRow}
            >
              {machineTypeFilters.map((filter) => {
                const active = filter === activeMachineType;
                return (
                  <Pressable
                    key={filter}
                    style={[styles.filterChip, active && styles.filterChipActive]}
                    onPress={() => setActiveMachineType(filter)}
                  >
                    <Text style={[styles.filterText, active && styles.filterTextActive]}>
                      {filter}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </>
        )}

        {isSuppliesCategory && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {suppliesFilters.map((filter) => {
              const active = filter === activeSupplyType;
              return (
                <Pressable
                  key={filter}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                  onPress={() => setActiveSupplyType(filter)}
                >
                  <Text style={[styles.filterText, active && styles.filterTextActive]}>
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}

        {displayAds.map((ad) => (
          <Pressable
            key={ad.id}
            style={styles.card}
            onPress={() => navigation.navigate('AdDetails', { ad })}
          >
            <View style={styles.cardImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{ad.title}</Text>
              <Text style={styles.price}>{ad.price}</Text>
              <Text style={styles.meta}>{ad.location} | {ad.time}</Text>
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
    paddingHorizontal: 0,
    paddingVertical: 0,
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
  filterChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(30, 115, 190, 0.08)',
  },
  filterText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 12,
  },
  filterTextActive: {
    color: COLORS.primary,
  },
  jobsTabsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
  },
  jobTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1EAF5',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  jobTabActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(30, 115, 190, 0.08)',
  },
  jobTabText: {
    fontWeight: '800',
    color: COLORS.text,
  },
  jobTabTextActive: {
    color: COLORS.primary,
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

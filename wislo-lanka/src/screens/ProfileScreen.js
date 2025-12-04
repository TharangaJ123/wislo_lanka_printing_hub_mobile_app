import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../theme/colors";
import TopBar from "../components/TopBar";

const quickLinks = [
  "My Ads",
  "Saved Ads",
  "Payments",
  "Settings",
  "Notifications",
  "Language",
];

const user = {
  name: "Print Hub User",
  initials: "PH",
  role: "Printing Hub Member",
  location: "Colombo, Sri Lanka",
  joined: "Joined Jan 2025",
  verified: true,
  phone: "+94 77 123 4567",
  email: "hello@printhub.lk",
  company: "Print Hub Pvt Ltd",
  stats: [
    { label: "Active Ads", value: 8 },
    { label: "Saved", value: 22 },
    { label: "Rating", value: "4.8" },
  ],
};

const ownedCompany = {
  name: "Print Hub Pvt Ltd",
  regNo: "BR/2024/1234",
  location: "Colombo 05",
  role: "Owner",
  requests: [
    { name: "Ruwan Perera", role: "Designer", status: "Pending" },
    { name: "Sithum Silva", role: "Press Operator", status: "Pending" },
  ],
};

const otherCompanies = [
  { name: "Colombo Print Works", location: "Colombo 03" },
  { name: "Kandy Press Co.", location: "Kandy" },
  { name: "Southern Packaging Ltd", location: "Galle" },
];

const ProfileScreen = ({ navigation }) => {
  const [requestedCompany, setRequestedCompany] = useState("Kandy Press Co.");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TopBar title="Profile" onBack={() => navigation?.goBack()} />

      <LinearGradient
        colors={["#EEF5FF", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.initials}</Text>
          </View>
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.role}>{user.role}</Text>
            <Text style={styles.meta}>{user.location}</Text>
          </View>
        </View>
        <View style={styles.badgesRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{user.joined}</Text>
          </View>
          {user.verified ? (
            <View style={[styles.badge, styles.badgePrimary]}>
              <Text style={[styles.badgeText, styles.badgePrimaryText]}>Verified</Text>
            </View>
          ) : null}
        </View>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile Overview</Text>
        <View style={styles.statsRow}>
          {user.stats.map((item) => (
            <View key={item.label} style={styles.stat}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone</Text>
          <Text style={styles.detailValue}>{user.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email</Text>
          <Text style={styles.detailValue}>{user.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Company</Text>
          <Text style={styles.detailValue}>{user.company}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account</Text>
        {quickLinks.map((item, idx) => (
          <Pressable key={item} style={[styles.row, idx === quickLinks.length - 1 && styles.rowLast]}>
            <Text style={styles.rowText}>{item}</Text>
            <Text style={styles.rowAction}>></Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Company</Text>
        <Text style={styles.subLabel}>Company you created</Text>
        <View style={styles.companyBox}>
          <View style={{ flex: 1 }}>
            <Text style={styles.companyName}>{ownedCompany.name}</Text>
            <Text style={styles.companyMeta}>Reg: {ownedCompany.regNo}</Text>
            <Text style={styles.companyMeta}>Location: {ownedCompany.location}</Text>
            <Text style={styles.companyBadge}>Role: {ownedCompany.role}</Text>
          </View>
        </View>
        <Text style={[styles.subLabel, { marginTop: 10 }]}>Join requests</Text>
        {ownedCompany.requests.map((req, idx) => (
          <View key={req.name} style={[styles.row, idx === ownedCompany.requests.length - 1 && styles.rowLast]}>
            <View>
              <Text style={styles.rowText}>{req.name}</Text>
              <Text style={styles.companyMeta}>{req.role}</Text>
            </View>
            <Text style={styles.pendingBadge}>{req.status}</Text>
          </View>
        ))}

        <Text style={[styles.subLabel, { marginTop: 14 }]}>Request to join a company</Text>
        {otherCompanies.map((co, idx) => {
          const isRequested = requestedCompany === co.name;
          return (
            <Pressable
              key={co.name}
              style={[styles.row, idx === otherCompanies.length - 1 && styles.rowLast]}
              onPress={() => setRequestedCompany(co.name)}
            >
              <View>
                <Text style={styles.rowText}>{co.name}</Text>
                <Text style={styles.companyMeta}>{co.location}</Text>
              </View>
              <Text style={isRequested ? styles.requestedText : styles.requestText}>
                {isRequested ? "Requested" : "Request to Join"}
              </Text>
            </Pressable>
          );
        })}
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
    gap: 12,
  },
  hero: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E4ECF5",
    marginBottom: 4,
  },
  avatarWrap: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#123A6A",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 20,
  },
  name: {
    fontWeight: "800",
    fontSize: 19,
    color: COLORS.text,
  },
  role: {
    color: COLORS.primary,
    fontWeight: "700",
    marginTop: 2,
    marginBottom: 4,
  },
  meta: {
    color: COLORS.muted,
    fontSize: 12,
  },
  badgesRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F0F6FF",
  },
  badgePrimary: {
    backgroundColor: COLORS.primary,
  },
  badgeText: {
    color: COLORS.text,
    fontWeight: "700",
    fontSize: 12,
  },
  badgePrimaryText: {
    color: COLORS.white,
  },
  card: {
    backgroundColor: COLORS.light,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E1EAF5",
    padding: 12,
  },
  cardTitle: {
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  stat: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E4ECF5",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },
  statLabel: {
    color: COLORS.muted,
    marginTop: 4,
    fontSize: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E4ECF5",
  },
  detailLabel: {
    color: COLORS.muted,
    fontWeight: "700",
    fontSize: 13,
  },
  detailValue: {
    color: COLORS.text,
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E4ECF5",
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowText: {
    color: COLORS.text,
    fontWeight: "700",
  },
  rowAction: {
    color: COLORS.primary,
    fontWeight: "900",
    fontSize: 16,
  },
  companyBox: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E4ECF5",
    padding: 12,
    marginBottom: 8,
  },
  companyName: {
    fontWeight: "800",
    fontSize: 15,
    color: COLORS.text,
  },
  companyMeta: {
    color: COLORS.muted,
    fontSize: 12,
  },
  companyBadge: {
    marginTop: 6,
    color: COLORS.primary,
    fontWeight: "800",
    fontSize: 12,
  },
  pendingBadge: {
    color: "#D87A00",
    fontWeight: "800",
  },
  subLabel: {
    color: COLORS.muted,
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 6,
  },
  requestText: {
    color: COLORS.primary,
    fontWeight: "800",
  },
  requestedText: {
    color: COLORS.muted,
    fontWeight: "800",
  },
});

export default ProfileScreen;

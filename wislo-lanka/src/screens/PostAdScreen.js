import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../theme/colors';

const Step = ({ title, children }) => (
  <View style={styles.step}>
    <Text style={styles.stepTitle}>{title}</Text>
    {children}
  </View>
);

const Input = ({ placeholder }) => (
  <TextInput
    placeholder={placeholder}
    placeholderTextColor="#9EB1C5"
    style={styles.input}
  />
);

const PostAdScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <Pressable onPress={() => navigation?.goBack()} hitSlop={10}>
          <Text style={styles.backChip}>{'‹'} Back</Text>
        </Pressable>
        <Text style={styles.breadcrumb}>Home / Post Ad</Text>
      </View>
      <Text style={styles.heading}>Post an Ad</Text>
      <Text style={styles.subheading}>Share your machines, services, or jobs with the printing community.</Text>

      <Step title="1. Choose Category">
        <Input placeholder="Select category (e.g., Used Machines)" />
      </Step>

      <Step title="2. Ad Details">
        <Input placeholder="Title" />
        <Input placeholder="Price (Free/Negotiable/Fixed)" />
        <TextInput
          placeholder="Description"
          placeholderTextColor="#9EB1C5"
          style={[styles.input, styles.textarea]}
          multiline
        />
      </Step>

      <Step title="3. Upload Photos (max 6)">
        <View style={styles.uploadRow}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <View key={idx} style={styles.uploadBox}>
              <Text style={styles.uploadText}>+</Text>
            </View>
          ))}
        </View>
      </Step>

      <Step title="4. Location">
        <Input placeholder="City / District" />
        <Input placeholder="Pin map location (optional)" />
      </Step>

      <Step title="5. Contact Details">
        <Input placeholder="Contact name" />
        <Input placeholder="Phone number" />
        <Input placeholder="WhatsApp (optional)" />
      </Step>

      <Step title="6. Ad Type">
        <View style={styles.typeRow}>
          <View style={[styles.typeCard, styles.typeCardActive]}>
            <Text style={styles.typeLabel}>Free</Text>
            <Text style={styles.typeMeta}>7 days</Text>
          </View>
          <View style={styles.typeCard}>
            <Text style={styles.typeLabel}>Featured</Text>
            <Text style={styles.typeMeta}>Boosted reach</Text>
          </View>
        </View>
      </Step>

      <PrimaryButton label="Submit Ad" onPress={() => {}} style={{ marginTop: 10 }} />
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
    paddingBottom: 32,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backChip: {
    color: COLORS.primary,
    backgroundColor: '#EAF3FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: '800',
    fontSize: 13,
    overflow: 'hidden',
  },
  breadcrumb: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  subheading: {
    color: COLORS.muted,
    marginBottom: 14,
    lineHeight: 20,
  },
  step: {
    backgroundColor: COLORS.light,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E4ECF5',
    marginBottom: 12,
  },
  stepTitle: {
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D7E3F2',
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: COLORS.text,
    marginBottom: 10,
  },
  textarea: {
    height: 90,
    textAlignVertical: 'top',
  },
  uploadRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  uploadBox: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D7E3F2',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '800',
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typeCard: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D7E3F2',
    backgroundColor: COLORS.white,
  },
  typeCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#E7F1FC',
  },
  typeLabel: {
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  typeMeta: {
    color: COLORS.muted,
  },
});

export default PostAdScreen;

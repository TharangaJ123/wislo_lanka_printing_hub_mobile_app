import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import TopBar from '../components/TopBar';
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

const districts = [
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Kandy',
  'Matale',
  'Nuwara Eliya',
  'Galle',
  'Matara',
  'Hambantota',
  'Jaffna',
  'Kilinochchi',
  'Mannar',
  'Vavuniya',
  'Mullaitivu',
  'Batticaloa',
  'Ampara',
  'Trincomalee',
  'Kurunegala',
  'Puttalam',
  'Anuradhapura',
  'Polonnaruwa',
  'Badulla',
  'Monaragala',
  'Ratnapura',
  'Kegalle',
];

const categories = [
  { label: 'Machines', subcategories: ['Brand New', 'Used Machines'] },
  { label: 'Jobs', subcategories: ['Hiring', 'Wanted'] },
  { label: 'Supplies' },
  { label: 'Companies' },
  { label: 'Services' },
  { label: 'Academy Teachers' },
  { label: 'Design & Prepress' },
  { label: 'Finishing' },
];

const PostAdScreen = ({ navigation }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('Select district');
  const [showDistrictList, setShowDistrictList] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState({});
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [subCategoryOpenFor, setSubCategoryOpenFor] = useState(null);

  const toggleCategory = (label) => {
    setSelectedCategories((prev) => {
      const exists = prev.includes(label);
      if (exists) {
        const next = prev.filter((c) => c !== label);
        const updatedSubs = { ...selectedSubCategories };
        delete updatedSubs[label];
        setSelectedSubCategories(updatedSubs);
        return next;
      }
      return [...prev, label];
    });
  };

  const getSubcategoryLabel = (label) => selectedSubCategories[label] || 'Select subcategory';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TopBar
        title="Post Ad"
        onBack={() => navigation?.goBack()}
        backgroundColor={COLORS.primary}
        textColor={COLORS.white}
      />
      <View style={styles.primaryContainer}>
        <Text style={styles.heading}>Post an Ad</Text>
        <Text style={styles.subheading}>Share your machines, services, or jobs with the printing community.</Text>

        <Step title="1. Choose Category">
          <Pressable
            style={[styles.input, styles.dropdown]}
            onPress={() => {
              setShowCategoryList((prev) => !prev);
              setSubCategoryOpenFor(null);
            }}
          >
            <Text
              style={[
                styles.dropdownText,
                selectedCategories.length === 0 && styles.placeholderText,
              ]}
            >
              {selectedCategories.length === 0 ? 'Select categories' : selectedCategories.join(', ')}
            </Text>
          </Pressable>
          {showCategoryList && (
            <View style={styles.dropdownList}>
              <ScrollView style={{ maxHeight: 220 }} showsVerticalScrollIndicator={false}>
                {categories.map((cat) => (
                  <Pressable
                    key={cat.label}
                    style={styles.dropdownItem}
                    onPress={() => {
                      toggleCategory(cat.label);
                      setShowCategoryList(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>
                      {cat.label}
                      {selectedCategories.includes(cat.label) ? '  ✓' : ''}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}

          {selectedCategories
            .map((label) => categories.find((c) => c.label === label))
            .filter((cat) => cat?.subcategories?.length)
            .map((cat) => (
              <View key={cat.label} style={{ marginTop: 6 }}>
                <Text style={styles.subLabel}>{cat.label} type</Text>
                <Pressable
                  style={[styles.input, styles.dropdown]}
                  onPress={() =>
                    setSubCategoryOpenFor((prev) => (prev === cat.label ? null : cat.label))
                  }
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      getSubcategoryLabel(cat.label) === 'Select subcategory' && styles.placeholderText,
                    ]}
                  >
                    {getSubcategoryLabel(cat.label)}
                  </Text>
                </Pressable>
                {subCategoryOpenFor === cat.label && (
                  <View style={styles.dropdownList}>
                    <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator={false}>
                      {cat.subcategories.map((sub) => (
                        <Pressable
                          key={sub}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setSelectedSubCategories((prev) => ({ ...prev, [cat.label]: sub }));
                            setSubCategoryOpenFor(null);
                          }}
                        >
                          <Text style={styles.dropdownItemText}>{sub}</Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            ))}
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
          <Pressable
            style={[styles.input, styles.dropdown]}
            onPress={() => setShowDistrictList((prev) => !prev)}
          >
            <Text
              style={[
                styles.dropdownText,
                selectedDistrict === 'Select district' && styles.placeholderText,
              ]}
            >
              {selectedDistrict}
            </Text>
          </Pressable>
          {showDistrictList && (
            <View style={styles.dropdownList}>
              <ScrollView style={{ maxHeight: 220 }} showsVerticalScrollIndicator={false}>
                {districts.map((district) => (
                  <Pressable
                    key={district}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedDistrict(district);
                      setShowDistrictList(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{district}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}
          <Input placeholder="House / No." />
          <Input placeholder="Lane / Street" />
          <Input placeholder="City" />
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
  primaryContainer: {
    padding:16
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
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
  dropdown: {
    justifyContent: 'center',
  },
  dropdownText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  placeholderText: {
    color: '#9EB1C5',
    fontWeight: '400',
  },
  dropdownList: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#D7E3F2',
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 6,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownItemText: {
    color: COLORS.text,
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.muted,
    marginBottom: 4,
    marginLeft: 2,
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

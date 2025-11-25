import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import { COLORS } from '../theme/colors';
import PrimaryButton from '../components/PrimaryButton';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 'slide-1',
    title: 'Buy & Sell Used Printing Machines Easily',
    blurb: 'List offset, digital, and finishing gear with crisp photos and quick price tags.',
    image: require('../../assets/onboarding/printer.png'),
  },
  {
    id: 'slide-2',
    title: 'Find Printing Materials & Suppliers Near You',
    blurb: 'Browse paper, inks, plates, and spare parts from trusted Sri Lankan vendors.',
    image: require('../../assets/onboarding/meterials.png'),
  },
  {
    id: 'slide-3',
    title: 'Learn from Teachers • Hire & Find Jobs',
    blurb: 'Upskill with mentors, post vacancies, and hire talent built for print.',
    image: require('../../assets/onboarding/job.png'),
  },
];

const OnboardingScreen = ({ onSkip, onDone }) => {
  const listRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      onDone?.();
      return;
    }
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  const isLast = currentIndex === slides.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={onSkip} hitSlop={10}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.imageCard}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.blurb}>{item.blurb}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                idx === currentIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>
        <PrimaryButton
          label={isLast ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={{ marginTop: 14 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 48,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  skip: {
    color: COLORS.muted,
    fontWeight: '700',
    fontSize: 14,
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  slide: {
    width,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCard: {
    width: width - 50,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: COLORS.text,
    marginBottom: 10,
    lineHeight: 30,
  },
  blurb: {
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.muted,
    lineHeight: 21,
    paddingHorizontal: 6,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C8D8EA',
  },
  dotActive: {
    width: 22,
    backgroundColor: COLORS.primary,
  },
});

export default OnboardingScreen;

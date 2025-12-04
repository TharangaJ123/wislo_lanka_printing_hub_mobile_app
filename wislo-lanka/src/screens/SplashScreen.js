import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 1600);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.container}>
      <View style={styles.logoBadge}>
        <Text style={styles.logo}>WL</Text>
      </View>
      <Text style={styles.brand}>Print Hub</Text>
      <Text style={styles.subBrand}>Printing Hub</Text>
      <Text style={styles.tagline}>Buy • Learn • Hire • Connect</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  logo: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
  },
  brand: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  subBrand: {
    color: COLORS.white,
    fontSize: 16,
    opacity: 0.88,
    marginTop: 2,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  tagline: {
    color: COLORS.white,
    fontSize: 15,
    opacity: 0.92,
    letterSpacing: 0.6,
  },
});

export default SplashScreen;

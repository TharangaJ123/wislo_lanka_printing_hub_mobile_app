import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../theme/colors';

const AuthScreen = ({ onContinue, onBack }) => {
  const [phone, setPhone] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {onBack ? (
          <View style={styles.topRow}>
            <Pressable onPress={onBack} hitSlop={10}>
              <Text style={styles.backChip}>{'‹'} Back</Text>
            </Pressable>
            <Text style={styles.breadcrumb}>Onboarding / Login</Text>
          </View>
        ) : null}

        <Text style={styles.heading}>Welcome to Wislo Lanka</Text>
        <Text style={styles.subheading}>Sign in to explore the Printing Hub marketplace.</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputRow}>
            <Text style={styles.dial}>+94</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="7X XXX XXXX"
              placeholderTextColor="#A3B4C5"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>
          <PrimaryButton label="Get OTP" onPress={onContinue} style={{ marginTop: 18 }} />

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <PrimaryButton
            label="Continue with Google"
            onPress={onContinue}
            variant="outline"
          />
        </View>

        <View style={styles.helpRow}>
          <Text style={styles.helpTitle}>Need help?</Text>
          <Text style={styles.helpText}>Contact support to verify your business account.</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 420,
    marginBottom: 16,
  },
  backChip: {
    color: COLORS.white,
    backgroundColor: COLORS.primary,
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
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 20,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 360,
  },
  card: {
    backgroundColor: COLORS.light,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E4ECF5',
    width: '100%',
    maxWidth: 420,
  },
  label: {
    color: COLORS.muted,
    fontSize: 13,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D5E2F0',
    paddingHorizontal: 12,
    height: 52,
  },
  dial: {
    fontWeight: '800',
    color: COLORS.primary,
    marginRight: 10,
    fontSize: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#D7E1EC',
  },
  dividerText: {
    color: COLORS.muted,
    fontWeight: '700',
    fontSize: 12,
  },
  helpRow: {
    marginTop: 18,
    width: '100%',
    maxWidth: 420,
  },
  helpTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  helpText: {
    color: COLORS.muted,
    lineHeight: 19,
    fontSize: 13,
  },
});

export default AuthScreen;

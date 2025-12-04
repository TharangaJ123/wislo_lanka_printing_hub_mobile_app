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

const SignUpScreen = ({ onBack, onComplete }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {onBack ? (
          <View style={styles.topRow}>
            <Pressable onPress={onBack} hitSlop={10}>
              <Text style={styles.backChip}>{'<'} Back</Text>
            </Pressable>
            <Text style={styles.breadcrumb}>Onboarding / Sign up</Text>
          </View>
        ) : null}

        <Text style={styles.heading}>Create your account</Text>
        <Text style={styles.subheading}>Join Print Hub to post ads, save favorites, and message sellers.</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g., Lakshan Perera"
            placeholderTextColor="#A3B4C5"
            style={styles.input}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="name@email.com"
            placeholderTextColor="#A3B4C5"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputRow}>
            <Text style={styles.dial}>+94</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="7X XXX XXXX"
              placeholderTextColor="#A3B4C5"
              keyboardType="phone-pad"
              style={styles.inputFlex}
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            placeholderTextColor="#A3B4C5"
            secureTextEntry
            style={styles.input}
          />

          <PrimaryButton label="Create Account" onPress={onComplete} style={{ marginTop: 18 }} />

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <PrimaryButton
            label="Continue with Google"
            onPress={onComplete}
            variant="outline"
          />
        </View>

        <View style={styles.helpRow}>
          <Text style={styles.helpTitle}>Already have an account?</Text>
          <Pressable onPress={onBack}>
            <Text style={styles.linkText}>Go to Login</Text>
          </Pressable>
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
  subheading: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 20,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 360,
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
    marginTop: 6,
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
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D5E2F0',
    paddingHorizontal: 12,
    height: 52,
    fontSize: 16,
    color: COLORS.text,
  },
  inputFlex: {
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
    alignItems: 'center',
    gap: 6,
  },
  helpTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.text,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 13,
  },
});

export default SignUpScreen;

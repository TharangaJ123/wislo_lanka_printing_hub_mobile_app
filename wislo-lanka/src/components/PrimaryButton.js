import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

const PrimaryButton = ({ label, onPress, variant = 'solid', style, disabled }) => {
  const isOutline = variant === 'outline';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        isOutline ? styles.outline : styles.solid,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.label, isOutline ? styles.outlineText : styles.solidText]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  solid: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  solidText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default PrimaryButton;

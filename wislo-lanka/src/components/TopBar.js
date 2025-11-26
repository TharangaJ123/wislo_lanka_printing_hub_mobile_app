import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';

const TopBar = ({
  title,
  breadcrumb,
  onBack,
  style,
  backgroundColor = COLORS.primary,
  textColor = COLORS.white,
  breadcrumbColor = 'rgba(255,255,255,0.85)',
}) => {
  return (
    <View style={[styles.wrap, { backgroundColor }, style]}>
      <TouchableOpacity onPress={onBack} hitSlop={10}>
        <Text
          style={[
            styles.backChip,
            {
              color: textColor,
              backgroundColor:
                backgroundColor === COLORS.white ? '#EAF3FF' : 'rgba(255,255,255,0.12)',
            },
          ]}
        >
          {'‹'} Back
        </Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
        {title}
      </Text>
      {breadcrumb ? (
        <Text style={[styles.breadcrumb, { color: breadcrumbColor }]} numberOfLines={1}>
          {breadcrumb}
        </Text>
      ) : (
        <View style={{ width: 60 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 12,
    width: '100%',
  },
  backChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: '800',
    fontSize: 16,
    overflow: 'hidden',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  breadcrumb: {
    flex: 1,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '700',
    paddingLeft: 12,
  },
});

export default TopBar;

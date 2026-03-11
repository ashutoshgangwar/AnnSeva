import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '../utils/theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
  },
  subtitle: {
    marginTop: 4,
    color: theme.colors.muted,
    fontSize: 13,
  },
});

const SectionHeader = ({title, subtitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

export default SectionHeader;

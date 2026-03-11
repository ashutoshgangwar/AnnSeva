import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {theme} from '../utils/theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: 13,
    color: theme.colors.muted,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    fontSize: 15,
    color: theme.colors.text,
  },
});

const InputField = ({label, ...props}) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput placeholderTextColor={theme.colors.muted} style={styles.input} {...props} />
    </View>
  );
};

export default InputField;

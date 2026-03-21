import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {theme} from '../utils/theme';

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  disabled: {
    backgroundColor: '#9CA3AF',
  },
  textBase: {
    fontSize: 15,
    fontWeight: '600',
  },
  textLight: {
    color: '#fff',
  },
  textPrimary: {
    color: theme.colors.primary,
  },
});

const AppButton = ({title, onPress, variant = 'primary', style, disabled = false}) => {
  const isOutline = variant === 'outline';
  const isDanger = variant === 'danger';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.base, styles[variant], disabled ? styles.disabled : null, style]}
      activeOpacity={0.8}
      disabled={disabled}>
      <Text
        style={[
          styles.textBase,
          isOutline ? styles.textPrimary : styles.textLight,
          isDanger ? styles.textLight : null,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;

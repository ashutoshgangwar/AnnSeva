import React from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../utils/theme';

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
    elevation: 2,
  },
});

const Card = ({children, style}) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '../utils/theme';

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  text: {
    fontSize: 11,
    color: theme.colors.primaryDark,
    fontWeight: '600',
  },
});

const Tag = ({label}) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default Tag;

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../utils/theme';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: theme.colors.primary,
  },
  label: {
    color: theme.colors.text,
    fontSize: 14,
  },
});

const CheckboxList = ({items, selected, onToggle}) => {
  return (
    <View>
      {items.map(item => {
        const isChecked = selected.includes(item);
        return (
          <TouchableOpacity
            key={item}
            style={styles.item}
            onPress={() => onToggle(item)}>
            <View style={[styles.checkbox, isChecked && styles.checked]} />
            <Text style={styles.label}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CheckboxList;

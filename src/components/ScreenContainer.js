import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {theme} from '../utils/theme';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
});

const ScreenContainer = ({children, scrollable = false, contentStyle}) => {
  if (scrollable) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={[styles.scrollContent, contentStyle]}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
};

export default ScreenContainer;

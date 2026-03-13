import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../utils/theme';

const AppHeader = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  showProfile = false,
  onProfilePress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        {showBack ? (
          <Pressable
            onPress={onBackPress}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={styles.backButton}>
            <Text style={styles.backArrow}>‹</Text>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        ) : null}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {showProfile ? (
        <Pressable
          onPress={onProfilePress}
          hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
          style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </Pressable>
      ) : (
        <View style={styles.profileSpacer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.primary,
    borderRadius: 0,
    paddingHorizontal: moderateScale(theme.spacing.md),
    paddingVertical: verticalScale(theme.spacing.md),
    marginHorizontal: -theme.spacing.lg,
    marginTop: -theme.spacing.lg,
    marginBottom: verticalScale(theme.spacing.md),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    paddingRight: moderateScale(theme.spacing.sm),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(6),
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: moderateScale(20),
    color: '#FFFFFF',
    fontWeight: '300',
    marginRight: moderateScale(4),
  },
  backText: {
    fontSize: moderateScale(13),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    marginTop: verticalScale(3),
    fontSize: moderateScale(12),
    color: '#D1FAE5',
    fontWeight: '500',
  },
  profileButton: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(19),
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  profileIcon: {
    fontSize: moderateScale(19),
  },
  profileSpacer: {
    width: moderateScale(38),
    height: moderateScale(38),
  },
});

export default AppHeader;

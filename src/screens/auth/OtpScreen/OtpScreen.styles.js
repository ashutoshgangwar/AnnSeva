import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  hero: {
    backgroundColor: theme.colors.primary,
    padding: moderateScale(theme.spacing.lg),
    borderRadius: moderateScale(theme.radius.lg),
    marginBottom: verticalScale(theme.spacing.lg),
  },
  heroTitle: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontWeight: '700',
  },
  heroSubtitle: {
    marginTop: verticalScale(6),
    color: 'rgba(255,255,255,0.8)',
    fontSize: moderateScale(13),
  },
  badge: {
    marginTop: verticalScale(theme.spacing.sm),
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(999),
  },
  badgeText: {
    color: '#fff',
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#E8F5E9',
    padding: moderateScale(theme.spacing.md),
    borderRadius: moderateScale(theme.radius.md),
    marginBottom: verticalScale(theme.spacing.lg),
  },
  infoText: {
    fontSize: moderateScale(13),
    color: theme.colors.primaryDark,
  },
  error: {
    marginTop: verticalScale(theme.spacing.sm),
    color: theme.colors.danger,
    fontSize: moderateScale(13),
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: moderateScale(theme.spacing.sm),
    marginBottom: verticalScale(theme.spacing.lg),
  },
  otpBox: {
    flex: 1,
    height: verticalScale(56),
    borderRadius: moderateScale(theme.radius.md),
    borderWidth: moderateScale(1.5),
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxActive: {
    borderColor: theme.colors.primary,
    backgroundColor: '#F1F8F4',
  },
  otpText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: theme.colors.text,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(theme.spacing.md),
  },
  resendText: {
    fontSize: moderateScale(12),
    color: theme.colors.muted,
  },
  resendLink: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: theme.colors.primary,
  },
});

export default styles;

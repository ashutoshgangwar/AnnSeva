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
  heroBadge: {
    marginTop: verticalScale(10),
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(999),
  },
  heroBadgeText: {
    color: '#fff',
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#F1F8F4',
    borderRadius: moderateScale(theme.radius.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.md),
  },
  infoTitle: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },
  infoText: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(12),
    color: theme.colors.muted,
  },
  formCard: {
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.md),
  },
  error: {
    marginTop: verticalScale(theme.spacing.sm),
    color: theme.colors.danger,
    fontSize: moderateScale(13),
  },
  actions: {
    marginTop: verticalScale(theme.spacing.lg),
  },
});

export default styles;

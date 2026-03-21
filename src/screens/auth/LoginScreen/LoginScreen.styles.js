import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  hero: {
    marginBottom: verticalScale(theme.spacing.lg),
    padding: moderateScale(theme.spacing.lg),
    borderRadius: moderateScale(theme.radius.lg),
    backgroundColor: theme.colors.primary,
  },
  heroTitle: {
    color: '#fff',
    fontSize: moderateScale(22),
    fontWeight: '700',
  },
  heroSubtitle: {
    marginTop: verticalScale(6),
    color: 'rgba(255,255,255,0.8)',
    fontSize: moderateScale(13),
  },
  modeSwitch: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: moderateScale(4),
    marginBottom: verticalScale(theme.spacing.md),
  },
  modeOption: {
    flex: 1,
    paddingVertical: verticalScale(theme.spacing.sm),
    borderRadius: moderateScale(theme.radius.sm),
    alignItems: 'center',
  },
  modeOptionActive: {
    backgroundColor: '#E8F5E9',
  },
  modeText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: theme.colors.muted,
  },
  modeTextActive: {
    color: theme.colors.primary,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -verticalScale(theme.spacing.xs),
    marginBottom: verticalScale(theme.spacing.sm),
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  orText: {
    marginHorizontal: moderateScale(theme.spacing.sm),
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: theme.colors.muted,
  },
  roleCard: {
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.md),
  },
  roleRow: {
    flexDirection: 'row',
    gap: moderateScale(theme.spacing.md),
    marginTop: verticalScale(theme.spacing.sm),
  },
  roleOption: {
    flex: 1,
    borderRadius: moderateScale(theme.radius.md),
    padding: moderateScale(theme.spacing.md),
    borderWidth: moderateScale(1.5),
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  roleOptionActive: {
    borderColor: theme.colors.primary,
    backgroundColor: '#E8F5E9',
  },
  roleTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: verticalScale(8),
  },
  roleSubtitle: {
    fontSize: moderateScale(12),
    color: theme.colors.muted,
    marginTop: verticalScale(4),
    textAlign: 'center',
  },
  radioOuter: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(2),
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: theme.colors.primary,
  },
  hintBox: {
    marginTop: verticalScale(theme.spacing.md),
    backgroundColor: '#E8F5E9',
    padding: moderateScale(theme.spacing.md),
    borderRadius: moderateScale(theme.radius.md),
  },
  hintText: {
    fontSize: moderateScale(13),
    color: theme.colors.primaryDark,
  },
  error: {
    marginTop: verticalScale(theme.spacing.sm),
    color: theme.colors.danger,
    fontSize: moderateScale(13),
  },
  divider: {
    marginVertical: verticalScale(theme.spacing.md),
    height: 1,
    backgroundColor: theme.colors.border,
  },
});

export default styles;

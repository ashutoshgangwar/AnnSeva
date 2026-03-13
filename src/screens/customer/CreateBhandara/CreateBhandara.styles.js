import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  content: {
    paddingBottom: verticalScale(theme.spacing.xl),
  },

  // Hero
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(theme.spacing.md),
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(theme.radius.lg),
    padding: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.lg),
  },
  heroEmoji: {
    fontSize: moderateScale(36),
  },
  heroTitle: {
    fontSize: moderateScale(20),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroSub: {
    fontSize: moderateScale(12),
    color: '#D1FAE5',
    marginTop: verticalScale(2),
    fontWeight: '500',
  },

  // Card
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.lg),
    padding: moderateScale(theme.spacing.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: verticalScale(theme.spacing.lg),
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(theme.spacing.sm),
    marginBottom: verticalScale(theme.spacing.md),
  },
  stepBadge: {
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(13),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: {
    fontSize: moderateScale(13),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  cardTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: theme.colors.text,
  },

  // Fields
  fieldLabel: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: theme.colors.muted,
    marginBottom: verticalScale(5),
    marginTop: verticalScale(4),
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: moderateScale(theme.radius.sm),
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(11),
    fontSize: moderateScale(14),
    color: theme.colors.text,
    marginBottom: verticalScale(theme.spacing.sm),
  },
  estimateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(theme.spacing.sm),
    backgroundColor: '#ECFDF5',
    borderRadius: moderateScale(theme.radius.sm),
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(10),
  },
  estimateLabel: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: theme.colors.primaryDark,
  },
  estimateValue: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: theme.colors.primary,
  },

  // Menu
  menuHint: {
    fontSize: moderateScale(11),
    color: theme.colors.muted,
    fontWeight: '600',
    marginBottom: verticalScale(theme.spacing.sm),
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(8),
  },
  menuChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(7),
    backgroundColor: '#F9FAFB',
  },
  menuChipActive: {
    backgroundColor: '#ECFDF5',
    borderColor: theme.colors.primary,
  },
  menuChipIcon: {
    fontSize: moderateScale(14),
  },
  menuChipLabel: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: theme.colors.muted,
  },
  menuChipLabelActive: {
    color: theme.colors.primaryDark,
  },
  menuChipTick: {
    fontSize: moderateScale(11),
    color: theme.colors.primary,
    fontWeight: '800',
  },

  // Summary strip
  summaryStrip: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: verticalScale(theme.spacing.md),
    overflow: 'hidden',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: verticalScale(12),
  },
  summaryVal: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: theme.colors.text,
  },
  summaryKey: {
    fontSize: moderateScale(11),
    color: theme.colors.muted,
    fontWeight: '600',
    marginTop: verticalScale(2),
  },
  summaryDivider: {
    width: 1,
    backgroundColor: theme.colors.border,
    marginVertical: verticalScale(10),
  },

  // Other Options
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(8),
    marginBottom: verticalScale(4),
  },
  optionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(7),
    backgroundColor: '#F9FAFB',
  },
  optionChipActive: {
    backgroundColor: '#ECFDF5',
    borderColor: theme.colors.primary,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: moderateScale(theme.spacing.sm),
    marginBottom: verticalScale(4),
  },
  toggleChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(6),
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: moderateScale(theme.radius.sm),
    paddingVertical: verticalScale(10),
    backgroundColor: '#F9FAFB',
  },
  toggleChipVeg: {
    backgroundColor: '#ECFDF5',
    borderColor: theme.colors.primary,
  },
  toggleChipNonVeg: {
    backgroundColor: '#FEF2F2',
    borderColor: theme.colors.danger,
  },

  // Instructions
  textArea: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: moderateScale(theme.radius.sm),
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(11),
    fontSize: moderateScale(14),
    color: theme.colors.text,
    minHeight: verticalScale(100),
    lineHeight: moderateScale(22),
  },
  charCount: {
    marginTop: verticalScale(4),
    fontSize: moderateScale(11),
    color: theme.colors.muted,
    textAlign: 'right',
  },

  // Submit
  submitBtn: {
    marginBottom: verticalScale(theme.spacing.md),
  },

  // Success
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    backgroundColor: '#ECFDF5',
    borderRadius: moderateScale(theme.radius.md),
    borderWidth: 1,
    borderColor: '#6EE7B7',
    padding: moderateScale(theme.spacing.md),
  },
  successIcon: {
    fontSize: moderateScale(22),
  },
  successText: {
    flex: 1,
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: theme.colors.primaryDark,
    lineHeight: moderateScale(20),
  },
});

export default styles;

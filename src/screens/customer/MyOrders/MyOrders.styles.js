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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(theme.radius.lg),
    padding: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.md),
  },
  heroTitle: {
    fontSize: moderateScale(20),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroSub: {
    fontSize: moderateScale(12),
    color: '#D1FAE5',
    fontWeight: '500',
    marginTop: verticalScale(2),
  },
  heroStats: {
    flexDirection: 'row',
    gap: moderateScale(6),
  },
  heroStatBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  heroStatBadgeGreen: {
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  heroStatText: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    gap: moderateScale(8),
    paddingBottom: verticalScale(theme.spacing.sm),
    marginBottom: verticalScale(theme.spacing.sm),
  },
  tab: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(7),
    backgroundColor: theme.colors.card,
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  tabText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: theme.colors.muted,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },

  // Card
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.lg),
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: verticalScale(theme.spacing.md),
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(6),
    paddingHorizontal: moderateScale(theme.spacing.md),
    paddingVertical: verticalScale(8),
    borderBottomWidth: 1,
  },
  statusIcon: {
    fontSize: moderateScale(13),
  },
  statusLabel: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    flex: 1,
  },
  orderId: {
    fontSize: moderateScale(11),
    color: theme.colors.muted,
    fontWeight: '600',
  },
  cardBody: {
    padding: moderateScale(theme.spacing.md),
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(theme.spacing.sm),
  },
  cardInfo: {
    flex: 1,
    marginRight: moderateScale(8),
  },
  locationText: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: theme.colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(6),
    marginTop: verticalScale(5),
  },
  metaText: {
    fontSize: moderateScale(11),
    color: theme.colors.muted,
    fontWeight: '500',
  },
  metaDot: {
    width: moderateScale(3),
    height: moderateScale(3),
    borderRadius: moderateScale(2),
    backgroundColor: theme.colors.muted,
  },
  costBadge: {
    alignItems: 'flex-end',
  },
  costValue: {
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: theme.colors.primary,
  },
  costLabel: {
    fontSize: moderateScale(10),
    color: theme.colors.muted,
    fontWeight: '600',
  },

  // Menu chips
  menuRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(6),
    marginBottom: verticalScale(theme.spacing.sm),
  },
  menuChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(4),
  },
  menuChipText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    color: theme.colors.text,
  },
  menuChipMore: {
    backgroundColor: '#ECFDF5',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(4),
  },
  menuChipMoreText: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },

  // Progress bar
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(theme.spacing.sm),
    paddingTop: verticalScale(theme.spacing.sm),
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  progressStep: {
    alignItems: 'center',
    gap: verticalScale(4),
  },
  progressDot: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(11),
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDotDone: {
    backgroundColor: theme.colors.primary,
  },
  progressDotText: {
    fontSize: moderateScale(10),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  progressLabel: {
    fontSize: moderateScale(9),
    fontWeight: '600',
    color: theme.colors.muted,
    textAlign: 'center',
  },
  progressLabelDone: {
    color: theme.colors.primary,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginBottom: verticalScale(14),
  },
  progressLineDone: {
    backgroundColor: theme.colors.primary,
  },

  // Summary button
  summaryBtn: {
    marginTop: verticalScale(theme.spacing.sm),
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: moderateScale(theme.radius.sm),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
  },
  summaryBtnText: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#1D4ED8',
  },

  // Empty
  emptyBox: {
    alignItems: 'center',
    paddingVertical: verticalScale(60),
  },
  emptyIcon: {
    fontSize: moderateScale(48),
    marginBottom: verticalScale(12),
  },
  emptyTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: verticalScale(6),
  },
  emptyText: {
    fontSize: moderateScale(13),
    color: theme.colors.muted,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
});

export default styles;

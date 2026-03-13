import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(theme.spacing.lg),
  },
  item: {
    marginBottom: verticalScale(theme.spacing.md),
    overflow: 'hidden',
    borderWidth: 0,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 8},
    elevation: 3,
  },
  cardAccentBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: verticalScale(4),
    backgroundColor: theme.colors.primary,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(4),
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(theme.spacing.sm),
    flexShrink: 1,
  },
  badge: {
    borderWidth: 1,
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(4),
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  badgeText: {
    fontWeight: '700',
    fontSize: moderateScale(11),
    color: theme.colors.success,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: theme.colors.text,
    flexShrink: 1,
  },
  callButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(14),
    minWidth: moderateScale(72),
  },
  meta: {
    marginTop: verticalScale(6),
    color: theme.colors.muted,
    fontSize: moderateScale(12),
  },
  contactText: {
    marginTop: verticalScale(6),
    color: theme.colors.primaryDark,
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(theme.spacing.sm),
    marginTop: verticalScale(10),
  },
  detailPill: {
    backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  detailPillStrong: {
    backgroundColor: '#E8F5E9',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  detailText: {
    fontSize: moderateScale(11),
    color: theme.colors.text,
    fontWeight: '600',
  },
  detailTextStrong: {
    fontSize: moderateScale(11),
    color: theme.colors.primaryDark,
    fontWeight: '700',
  },
  menuTitle: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(12),
    color: theme.colors.muted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  menuChipsRow: {
    marginTop: verticalScale(8),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(theme.spacing.xs),
  },
  menuChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(999),
  },
  menuChipText: {
    fontSize: moderateScale(11),
    color: theme.colors.text,
    fontWeight: '600',
  },
  menuChipMore: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(999),
  },
  menuChipMoreText: {
    fontSize: moderateScale(11),
    color: theme.colors.muted,
    fontWeight: '600',
  },
  statusRow: {
    flexDirection: 'row',
    gap: moderateScale(theme.spacing.sm),
    marginTop: verticalScale(14),
  },
  statusBadge: {
    backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  statusBadgeReached: {
    backgroundColor: '#DCFCE7',
  },
  statusBadgeText: {
    fontSize: moderateScale(11),
    color: theme.colors.muted,
    fontWeight: '700',
  },
  statusBadgeTextReached: {
    color: theme.colors.success,
  },
  actionRow: {
    marginTop: verticalScale(theme.spacing.sm),
    flexDirection: 'row',
    gap: moderateScale(theme.spacing.sm),
  },
  actionButton: {
    flex: 1,
  },
  emptyCard: {
    marginTop: verticalScale(theme.spacing.lg),
    alignItems: 'center',
    paddingVertical: verticalScale(theme.spacing.xl),
    borderStyle: 'dashed',
  },
  emptyTitle: {
    fontSize: moderateScale(18),
    color: theme.colors.text,
    fontWeight: '800',
  },
  emptySubtitle: {
    marginTop: verticalScale(8),
    textAlign: 'center',
    color: theme.colors.muted,
    fontSize: moderateScale(13),
    lineHeight: moderateScale(18),
  },
});

export default styles;
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
    backgroundColor: '#34D399',
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(4),
  },
  badge: {
    borderWidth: 1,
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(4),
  },
  badgeHigh: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  badgeMedium: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  badgeNormal: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  badgeText: {
    fontWeight: '700',
    fontSize: moderateScale(11),
  },
  badgeTextHigh: {
    color: theme.colors.danger,
  },
  badgeTextMedium: {
    color: '#B45309',
  },
  badgeTextNormal: {
    color: theme.colors.success,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: theme.colors.text,
  },
  meta: {
    marginTop: verticalScale(6),
    color: theme.colors.muted,
    fontSize: moderateScale(12),
  },
  detailRow: {
    flexDirection: 'row',
    gap: moderateScale(theme.spacing.sm),
    marginTop: verticalScale(10),
  },
  detailPill: {
    backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  detailText: {
    fontSize: moderateScale(11),
    color: theme.colors.text,
    fontWeight: '600',
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
  cardDivider: {
    marginTop: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  actions: {
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

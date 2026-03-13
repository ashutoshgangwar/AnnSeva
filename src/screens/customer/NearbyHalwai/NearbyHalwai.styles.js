import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  content: {
    paddingBottom: verticalScale(theme.spacing.xl),
  },
  list: {
    paddingTop: verticalScale(theme.spacing.sm),
  },

  // Hero
  hero: {
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(theme.radius.lg),
    padding: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.md),
  },
  heroTitle: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroSub: {
    fontSize: moderateScale(12),
    color: '#D1FAE5',
    fontWeight: '500',
    marginTop: verticalScale(3),
  },

  // Search
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: moderateScale(12),
    marginBottom: verticalScale(theme.spacing.sm),
    gap: moderateScale(8),
  },
  searchIcon: {
    fontSize: moderateScale(16),
  },
  searchInput: {
    flex: 1,
    paddingVertical: verticalScale(11),
    fontSize: moderateScale(14),
    color: theme.colors.text,
  },
  clearSearch: {
    fontSize: moderateScale(14),
    color: theme.colors.muted,
    paddingHorizontal: moderateScale(4),
  },

  // Sort
  sortRow: {
    flexDirection: 'row',
    gap: moderateScale(8),
    marginBottom: verticalScale(theme.spacing.sm),
  },
  sortChip: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(6),
    backgroundColor: theme.colors.card,
  },
  sortChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  sortChipText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: theme.colors.muted,
  },
  sortChipTextActive: {
    color: '#FFFFFF',
  },
  resultsText: {
    fontSize: moderateScale(12),
    color: theme.colors.muted,
    fontWeight: '600',
    marginBottom: verticalScale(4),
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
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
  },
  unavailableBanner: {
    backgroundColor: '#FEF2F2',
    paddingVertical: verticalScale(6),
    paddingHorizontal: moderateScale(theme.spacing.md),
    borderBottomWidth: 1,
    borderBottomColor: '#FECACA',
  },
  unavailableText: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: theme.colors.danger,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: moderateScale(theme.spacing.md),
    gap: moderateScale(12),
  },
  avatar: {
    width: moderateScale(52),
    height: moderateScale(52),
    borderRadius: moderateScale(26),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headInfo: {
    flex: 1,
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: theme.colors.text,
  },
  specialty: {
    fontSize: moderateScale(12),
    color: theme.colors.muted,
    marginTop: verticalScale(2),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
    marginTop: verticalScale(5),
  },
  ratingText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#B45309',
  },
  reviewText: {
    fontSize: moderateScale(11),
    color: theme.colors.muted,
  },
  dot: {
    width: moderateScale(3),
    height: moderateScale(3),
    borderRadius: moderateScale(2),
    backgroundColor: theme.colors.muted,
  },
  expText: {
    fontSize: moderateScale(11),
    color: theme.colors.muted,
    fontWeight: '600',
  },
  priceBox: {
    alignItems: 'flex-end',
  },
  priceValue: {
    fontSize: moderateScale(20),
    fontWeight: '800',
    color: theme.colors.primary,
  },
  priceLabel: {
    fontSize: moderateScale(10),
    color: theme.colors.muted,
    fontWeight: '600',
  },

  // Pills
  pillRow: {
    flexDirection: 'row',
    gap: moderateScale(8),
    paddingHorizontal: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(10),
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  pillText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    color: theme.colors.text,
  },

  // Tags
  tagRow: {
    flexDirection: 'row',
    gap: moderateScale(6),
    paddingHorizontal: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.md),
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#ECFDF5',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(4),
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  tagText: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },

  // Actions
  actionRow: {
    flexDirection: 'row',
    gap: moderateScale(theme.spacing.sm),
    padding: moderateScale(theme.spacing.md),
    paddingTop: 0,
  },
  bookBtn: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(theme.radius.sm),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
  },
  bookBtnDisabled: {
    backgroundColor: '#D1D5DB',
  },
  bookBtnText: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Empty
  emptyBox: {
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  emptyIcon: {
    fontSize: moderateScale(36),
    marginBottom: verticalScale(10),
  },
  emptyText: {
    fontSize: moderateScale(14),
    color: theme.colors.muted,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;

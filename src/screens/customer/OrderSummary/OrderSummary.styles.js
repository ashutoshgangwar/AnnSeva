import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  content: {
    paddingBottom: verticalScale(theme.spacing.xl),
  },
  errorText: {
    fontSize: moderateScale(14),
    color: theme.colors.muted,
    textAlign: 'center',
    marginTop: verticalScale(40),
  },

  // Hero
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(theme.spacing.md),
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(theme.radius.lg),
    padding: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.md),
  },
  heroEmoji: {
    fontSize: moderateScale(38),
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

  // Amount Card
  amountCard: {
    backgroundColor: '#FFF7ED',
    borderRadius: moderateScale(theme.radius.lg),
    borderWidth: 1,
    borderColor: '#FED7AA',
    padding: moderateScale(theme.spacing.md),
    alignItems: 'center',
    marginBottom: verticalScale(theme.spacing.md),
  },
  amountLabel: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#92400E',
    marginBottom: verticalScale(4),
  },
  amountValue: {
    fontSize: moderateScale(40),
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: -1,
  },
  amountBadge: {
    marginTop: verticalScale(8),
    backgroundColor: '#ECFDF5',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(5),
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  amountBadgeText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },

  // Card
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.lg),
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.md),
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
  },
  cardTitle: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: verticalScale(theme.spacing.sm),
  },

  // Detail table
  detailTable: {
    gap: verticalScale(8),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontSize: moderateScale(13),
    color: theme.colors.muted,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: moderateScale(13),
    color: theme.colors.text,
    fontWeight: '700',
  },

  // Menu chips
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(8),
  },
  menuHint: {
    fontSize: moderateScale(11),
    color: theme.colors.muted,
    fontWeight: '500',
    marginBottom: verticalScale(theme.spacing.sm),
  },
  menuChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(7),
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  menuChipActive: {
    backgroundColor: '#FFF7ED',
    borderColor: '#F59E0B',
  },
  menuChipText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: theme.colors.muted,
  },
  menuChipTextActive: {
    color: '#B45309',
    fontWeight: '700',
  },
  menuSelCount: {
    marginTop: verticalScale(8),
    fontSize: moderateScale(11),
    color: '#B45309',
    fontWeight: '700',
  },

  // Rating
  ratingHint: {
    fontSize: moderateScale(13),
    color: theme.colors.muted,
    marginBottom: verticalScale(theme.spacing.sm),
  },
  starsRow: {
    flexDirection: 'row',
    gap: moderateScale(8),
    marginBottom: verticalScale(6),
  },
  starIcon: {
    fontSize: moderateScale(38),
    color: '#D1D5DB',
  },
  starIconActive: {
    color: '#F59E0B',
  },
  ratingCaption: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: verticalScale(theme.spacing.sm),
  },
  ratingBtn: {
    marginTop: verticalScale(theme.spacing.sm),
  },
  thankBox: {
    marginTop: verticalScale(theme.spacing.sm),
    backgroundColor: '#ECFDF5',
    borderRadius: moderateScale(theme.radius.sm),
    padding: moderateScale(theme.spacing.md),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  thankText: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },

  backBtn: {
    marginTop: verticalScale(4),
  },
});

export default styles;

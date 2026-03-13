import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  content: {
    paddingBottom: verticalScale(theme.spacing.xl),
  },
  heroCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(theme.radius.lg),
    padding: moderateScale(theme.spacing.sm + 2),
    marginBottom: verticalScale(theme.spacing.md),
  },
  heroLabel: {
    fontSize: moderateScale(11),
    color: '#D1FAE5',
    fontWeight: '700',
  },
  heroTitle: {
    marginTop: verticalScale(4),
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(theme.spacing.sm),
    marginTop: verticalScale(8),
  },
  heroChip: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(9),
    paddingVertical: verticalScale(4),
  },
  heroChipText: {
    fontSize: moderateScale(10),
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: theme.colors.text,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(theme.spacing.sm),
  },
  grid: {
    flexDirection: 'row',
    gap: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.lg),
  },
  card: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.md),
    padding: moderateScale(theme.spacing.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: verticalScale(130),
    justifyContent: 'space-between',
  },
  cardIcon: {
    fontSize: moderateScale(22),
    marginBottom: verticalScale(8),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: theme.colors.text,
  },
  subtitle: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(12),
    color: theme.colors.muted,
    lineHeight: moderateScale(18),
  },
  cardLink: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(12),
    color: theme.colors.primary,
    fontWeight: '700',
  },
  myOrdersBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(theme.radius.md),
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  myOrdersBtnText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(theme.spacing.sm),
  },
  linkText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: theme.colors.primary,
  },
  distanceFilterRow: {
    flexDirection: 'row',
    paddingBottom: verticalScale(theme.spacing.sm),
    marginBottom: verticalScale(theme.spacing.sm),
  },
  distanceChip: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(6),
    marginRight: moderateScale(theme.spacing.sm),
    backgroundColor: theme.colors.card,
  },
  distanceChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  distanceChipText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: theme.colors.muted,
  },
  distanceChipTextActive: {
    color: '#FFFFFF',
  },
  noHalwaiBox: {
    width: moderateScale(240),
    paddingVertical: verticalScale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  noHalwaiText: {
    fontSize: moderateScale(13),
    color: theme.colors.muted,
    fontWeight: '600',
    textAlign: 'center',
  },
  halwaiTeaser: {
    flexDirection: 'row',
    paddingBottom: verticalScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.sm),
  },
  halwaiTeaserCard: {
    width: moderateScale(110),
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.md),
    padding: moderateScale(theme.spacing.sm + 2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    marginRight: moderateScale(theme.spacing.md),
  },
  halwaiAvatar: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(6),
  },
  halwaiAvatarText: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  halwaiTeaserName: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
  },
  halwaiTeaserDist: {
    fontSize: moderateScale(11),
    color: theme.colors.muted,
    marginTop: verticalScale(3),
  },
  halwaiTeaserRating: {
    marginTop: verticalScale(6),
    backgroundColor: '#FFF7ED',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(3),
  },
  halwaiTeaserRatingText: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    color: '#B45309',
  },
});

export default styles;

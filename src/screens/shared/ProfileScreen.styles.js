import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../utils/theme';

const styles = StyleSheet.create({
  content: {
    paddingBottom: verticalScale(theme.spacing.xl),
  },

  // Hero
  heroCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(theme.radius.lg),
    padding: moderateScale(theme.spacing.lg),
    alignItems: 'center',
    marginBottom: verticalScale(theme.spacing.md),
  },
  avatar: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: {
    fontSize: moderateScale(34),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroName: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroRole: {
    fontSize: moderateScale(13),
    color: '#D1FAE5',
    fontWeight: '500',
    marginTop: verticalScale(3),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(6),
    marginTop: verticalScale(10),
  },
  ratingText: {
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: '#FDE68A',
  },
  ratingReviews: {
    fontSize: moderateScale(12),
    color: '#D1FAE5',
    fontWeight: '500',
  },
  tagRow: {
    gap: moderateScale(6),
    paddingHorizontal: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.sm),
  },
  tagRowInline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(6),
    marginTop: verticalScale(12),
    justifyContent: 'center',
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(4),
  },
  tagText: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: moderateScale(theme.spacing.sm),
    marginBottom: verticalScale(theme.spacing.md),
  },
  statsRowSpaced: {
    marginTop: verticalScale(theme.spacing.sm),
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.md),
    padding: moderateScale(theme.spacing.md),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
    elevation: 1,
  },
  statValue: {
    fontSize: moderateScale(20),
    fontWeight: '800',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: moderateScale(11),
    color: theme.colors.muted,
    fontWeight: '600',
    marginTop: verticalScale(3),
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
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: verticalScale(theme.spacing.sm),
  },

  // Info rows
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  infoIcon: {
    fontSize: moderateScale(16),
  },
  infoLabel: {
    fontSize: moderateScale(13),
    color: theme.colors.muted,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: theme.colors.text,
  },

  // Quick actions
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    gap: moderateScale(10),
  },
  actionRowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionIcon: {
    fontSize: moderateScale(18),
  },
  actionLabel: {
    flex: 1,
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: theme.colors.text,
  },
  logoutLabel: {
    color: theme.colors.danger,
  },
  actionArrow: {
    fontSize: moderateScale(20),
    color: theme.colors.muted,
    fontWeight: '300',
  },

  // Logout
  logoutBtn: {
    marginTop: verticalScale(4),
  },
});

export default styles;

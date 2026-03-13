import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(theme.radius.lg),
    padding: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.md),
  },
  heroLabel: {
    fontSize: moderateScale(12),
    color: '#D1FAE5',
    fontWeight: '600',
  },
  heroTitle: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(20),
    fontWeight: '800',
    color: theme.colors.card,
  },
  heroSubtitle: {
    marginTop: verticalScale(8),
    fontSize: moderateScale(12),
    color: '#ECFDF5',
    lineHeight: moderateScale(18),
  },
  statsRow: {
    flexDirection: 'row',
    gap: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.md),
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    padding: moderateScale(theme.spacing.md),
    borderRadius: moderateScale(theme.radius.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pendingCard: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FED7AA',
  },
  activeCard: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  statValue: {
    fontSize: moderateScale(20),
    fontWeight: '800',
    color: theme.colors.text,
  },
  statLabel: {
    marginTop: verticalScale(4),
    fontSize: moderateScale(12),
    color: theme.colors.muted,
    fontWeight: '600',
  },
  importantCard: {
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.lg),
  },
  importantTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: theme.colors.primaryDark,
    marginBottom: verticalScale(8),
  },
  importantName: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: theme.colors.text,
  },
  importantMeta: {
    marginTop: verticalScale(4),
    fontSize: moderateScale(12),
    color: theme.colors.muted,
  },
  importantMenu: {
    marginTop: verticalScale(8),
    fontSize: moderateScale(13),
    color: theme.colors.text,
  },
  importantEmpty: {
    fontSize: moderateScale(13),
    color: theme.colors.muted,
    lineHeight: moderateScale(18),
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.md),
    padding: moderateScale(theme.spacing.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: verticalScale(theme.spacing.md),
  },
  actionHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: moderateScale(8),
    fontSize: moderateScale(18),
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
  },
});

export default styles;

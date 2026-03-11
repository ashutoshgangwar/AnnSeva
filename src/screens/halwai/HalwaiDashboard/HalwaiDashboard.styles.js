import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    gap: moderateScale(theme.spacing.md),
    marginBottom: verticalScale(theme.spacing.lg),
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    padding: moderateScale(theme.spacing.md),
    borderRadius: moderateScale(theme.radius.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statValue: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: theme.colors.text,
  },
  statLabel: {
    marginTop: verticalScale(4),
    fontSize: moderateScale(12),
    color: theme.colors.muted,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.md),
    padding: moderateScale(theme.spacing.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: verticalScale(theme.spacing.md),
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

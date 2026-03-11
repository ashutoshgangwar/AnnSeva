import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: theme.colors.text,
  },
  meta: {
    marginTop: verticalScale(6),
    color: theme.colors.muted,
    fontSize: moderateScale(13),
  },
  row: {
    marginTop: verticalScale(theme.spacing.md),
  },
  label: {
    fontSize: moderateScale(12),
    color: theme.colors.muted,
  },
  value: {
    marginTop: verticalScale(4),
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: theme.colors.text,
  },
  logoutWrap: {
    marginTop: verticalScale(theme.spacing.lg),
  },
});

export default styles;

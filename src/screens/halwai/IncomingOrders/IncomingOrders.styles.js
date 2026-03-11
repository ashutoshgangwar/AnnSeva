import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  item: {
    marginBottom: verticalScale(theme.spacing.md),
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
  menu: {
    marginTop: verticalScale(8),
    color: theme.colors.text,
    fontSize: moderateScale(13),
  },
  actions: {
    marginTop: verticalScale(theme.spacing.md),
    flexDirection: 'row',
    gap: moderateScale(theme.spacing.sm),
  },
});

export default styles;

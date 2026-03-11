import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  item: {
    marginBottom: verticalScale(theme.spacing.md),
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: theme.colors.text,
  },
  meta: {
    marginTop: verticalScale(6),
    color: theme.colors.muted,
    fontSize: moderateScale(12),
  },
  price: {
    marginTop: verticalScale(8),
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: theme.colors.primary,
  },
});

export default styles;

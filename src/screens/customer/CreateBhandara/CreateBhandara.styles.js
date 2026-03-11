import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  success: {
    marginTop: verticalScale(theme.spacing.md),
    color: theme.colors.success,
    fontSize: moderateScale(13),
  },
  helper: {
    fontSize: moderateScale(12),
    color: theme.colors.muted,
    marginBottom: verticalScale(theme.spacing.sm),
  },
  submitWrap: {
    marginTop: verticalScale(theme.spacing.lg),
  },
});

export default styles;

import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(theme.spacing.md),
  },
  card: {
    width: '48%',
    backgroundColor: theme.colors.card,
    borderRadius: moderateScale(theme.radius.md),
    padding: moderateScale(theme.spacing.md),
    borderWidth: 1,
    borderColor: theme.colors.border,
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

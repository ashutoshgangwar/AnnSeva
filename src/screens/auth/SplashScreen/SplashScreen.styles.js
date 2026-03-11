import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(24),
  },
  logo: {
    width: moderateScale(72),
    height: moderateScale(72),
    borderRadius: moderateScale(20),
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: moderateScale(26),
    color: '#fff',
    fontWeight: '700',
  },
  title: {
    marginTop: verticalScale(18),
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: verticalScale(8),
    color: theme.colors.muted,
    fontSize: moderateScale(13),
    textAlign: 'center',
  },
});

export default styles;

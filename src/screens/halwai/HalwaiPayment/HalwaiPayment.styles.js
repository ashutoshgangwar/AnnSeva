import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  content: {
    paddingBottom: verticalScale(theme.spacing.xl),
  },
  amountCard: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FED7AA',
    marginBottom: verticalScale(theme.spacing.md),
  },
  amountLabel: {
    fontSize: moderateScale(12),
    color: '#9A3412',
    fontWeight: '700',
  },
  amountValue: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(24),
    color: theme.colors.text,
    fontWeight: '800',
  },
  amountSubtext: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(12),
    color: theme.colors.muted,
  },
  sectionCard: {
    marginBottom: verticalScale(theme.spacing.md),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: verticalScale(8),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  infoRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: verticalScale(8),
  },
  infoLabel: {
    fontSize: moderateScale(12),
    color: theme.colors.muted,
  },
  infoValue: {
    fontSize: moderateScale(12),
    color: theme.colors.text,
    fontWeight: '700',
  },
  paidText: {
    color: theme.colors.success,
  },
  menuText: {
    fontSize: moderateScale(13),
    color: theme.colors.text,
    lineHeight: moderateScale(20),
  },
  emptyCard: {
    marginTop: verticalScale(theme.spacing.lg),
    alignItems: 'center',
    paddingVertical: verticalScale(theme.spacing.xl),
  },
  emptyTitle: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: theme.colors.text,
  },
  emptySubtitle: {
    marginTop: verticalScale(8),
    fontSize: moderateScale(13),
    color: theme.colors.muted,
  },
});

export default styles;

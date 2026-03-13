import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {theme} from '../../../utils/theme';

const styles = StyleSheet.create({
  content: {
    paddingBottom: verticalScale(theme.spacing.xl),
  },
  heroCard: {
    backgroundColor: theme.colors.primary,
    borderWidth: 0,
    marginBottom: verticalScale(theme.spacing.md),
  },
  heroLabel: {
    fontSize: moderateScale(12),
    color: '#D1FAE5',
    fontWeight: '700',
  },
  heroTitle: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(20),
    color: '#FFFFFF',
    fontWeight: '800',
  },
  heroSubtitle: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(13),
    color: '#ECFDF5',
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
  progressRow: {
    flexDirection: 'row',
    gap: moderateScale(theme.spacing.sm),
    flexWrap: 'wrap',
  },
  progressStep: {
    backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(6),
  },
  progressStepDone: {
    backgroundColor: '#DCFCE7',
  },
  progressStepText: {
    fontSize: moderateScale(11),
    color: theme.colors.muted,
    fontWeight: '700',
  },
  progressStepTextDone: {
    fontSize: moderateScale(11),
    color: theme.colors.success,
    fontWeight: '700',
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

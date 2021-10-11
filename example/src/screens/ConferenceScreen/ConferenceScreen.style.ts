import COLORS from '@constants/colors.constants';
import { FONT_WEIGHTS } from '@constants/fonts.constants';
import { SPACE_XXS, SPACE_XS, SPACE_M } from '@constants/sizes.constants';
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  top: {},
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    borderColor: '#fff',
    borderWidth: 0,
    flex: 1,
  },
  bottom: {
    paddingBottom: Platform.OS === 'ios' ? 30 : 70,
  },
  participantsList: {
    flexDirection: 'row',
  },
  leaveButton: {},
  participant: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 10,
    borderRadius: SPACE_XXS,
    height: SPACE_M,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionButton: {},
  menuBackdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 1,
  },
  optionsContainerStyle: {
    borderRadius: SPACE_M,
    paddingVertical: SPACE_XS,
  },
  optionWrapper: {
    paddingHorizontal: SPACE_M,
    paddingVertical: SPACE_XXS,
  },
  optionText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FONT_WEIGHTS.medium,
  },
});

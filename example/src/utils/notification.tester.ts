import { Alert } from 'react-native';

import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';

import type {
  Conference,
  ParticipantInvited,
} from '../../../src/services/conference/models';
import { ConferencePermission } from '../../../src/services/conference/models';

const randomInvitedParticipant = ({
  includePermissions = false,
} = {}): ParticipantInvited => ({
  info: {
    externalId: 'externalId-123',
    name: 'John Invited',
  },
  permissions: includePermissions ? [ConferencePermission.INVITE] : [],
});

export const invite = async (
  conference: Conference,
  participants: ParticipantInvited[]
) => {
  try {
    await DolbyIoIAPI.notification.invite(conference, participants);
  } catch (e: any) {
    Alert.alert('Invite error', e.toString());
  }
};

export const inviteRandomParticipant = async (conference: Conference) => {
  try {
    await DolbyIoIAPI.notification.invite(conference, [
      randomInvitedParticipant(),
    ]);
  } catch (e: any) {
    Alert.alert('Invite error', e.toString());
  }
};

export const decline = async (conference: Conference) => {
  try {
    await DolbyIoIAPI.notification.decline(conference);
  } catch (e: any) {
    Alert.alert('Decline error', e.toString());
  }
};

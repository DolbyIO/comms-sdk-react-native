import React, { useContext, useEffect } from 'react';
import Toast from 'react-native-toast-message';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import CommsAPI from '@dolbyio/comms-sdk-reactnative';

import type { InvitationReceivedEventType } from '../../../../src/services/notification/events';
import InvitationResponseButtons from './InvitationResponseButtons';

const InvitationHandler: React.FC = () => {
  const { joinWithId } = useContext(DolbyIOContext);
  const onInvitationReceived = (data: InvitationReceivedEventType) => {
    console.log(
      'INVITATION RECEIVED EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );
    const {
      conferenceAlias,
      conferenceId,
      participant: {
        info: { name },
      },
    } = data;
    Toast.show({
      type: 'custom',
      props: {
        title: 'INVITATION RECEIVED EVENT DATA',
        content: JSON.stringify(
          { conferenceAlias, inviterName: name },
          null,
          2
        ),
        children: InvitationResponseButtons({
          conferenceId,
          joinWithId,
        }),
      },
    });
  };

  useEffect(() => {
    return CommsAPI.notification.onInvitationReceived(onInvitationReceived);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default InvitationHandler;

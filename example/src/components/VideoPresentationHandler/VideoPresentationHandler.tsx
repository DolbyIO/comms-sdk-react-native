import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';

import CommsAPI from '@dolbyio/comms-sdk-reactnative';

import type {
  VideoPresentationEventType,
  VideoPresentationEventNames,
} from '../../../../src/services/videoPresentation/events';

const VideoPresentationHandler: React.FC = () => {
  const videoPresentationStopped = () => {
    Toast.show({
      type: 'custom',
      props: {
        title: 'VIDEO PRESENTATION STOPPED',
      },
    });
  };

  const videoPresentationChanged = async (
    event: VideoPresentationEventType,
    type?: VideoPresentationEventNames
  ) => {
    console.log(
      'VIDEO PRESENTATION CHANGE\n',
      JSON.stringify(event, null, 2),
      type
    );
    Toast.show({
      type: 'custom',
      props: {
        title: 'VIDEO PRESENTATION CHANGE EVENT DATA',
        content: JSON.stringify(
          {
            changeEventType: type,
            fileURL: event.url,
          },
          null,
          2
        ),
      },
    });
  };

  useEffect(() => {
    const videoPresentationChangeUnsubscribeFn =
      CommsAPI.videoPresentation.onVideoPresentationChange(
        videoPresentationChanged
      );
    const videoPresentationStoppedUnsubscribeFn =
      CommsAPI.videoPresentation.onVideoPresentationStopped(
        videoPresentationStopped
      );

    return () => {
      videoPresentationChangeUnsubscribeFn();
      videoPresentationStoppedUnsubscribeFn();
    };
  }, []);

  return null;
};

export default VideoPresentationHandler;

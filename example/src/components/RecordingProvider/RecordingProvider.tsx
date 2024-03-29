import React, { useState } from 'react';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

export interface IRecordingProvider {
  isRecording?: Boolean;
  startRecord: () => void;
  stopRecord: () => void;
}

export const RecordingContext = React.createContext<IRecordingProvider>({
  isRecording: false,
  startRecord: () => {},
  stopRecord: () => {},
});

type RecordingProps = {
  children: React.ReactNode;
};

const RecordingProvider: React.FC<RecordingProps> = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecord = async () => {
    await CommsAPI.recording.start();
    setIsRecording(true);
  };

  const stopRecord = async () => {
    await CommsAPI.recording.stop();
    setIsRecording(false);
  };

  const contextValue = {
    isRecording,
    startRecord,
    stopRecord,
  };

  return (
    <RecordingContext.Provider value={contextValue}>
      {children}
    </RecordingContext.Provider>
  );
};

export default RecordingProvider;

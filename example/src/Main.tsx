import ConferenceScreen from './screens/ConferenceScreen';
import InitializationScreen from './screens/InitializationScreen';
import JoinScreen from './screens/JoinScreen';
import LoginScreen from './screens/LoginScreen';
import { DolbyIOContext } from '@components/DolbyIOProvider';
import React, { useContext } from 'react';

const Main = () => {
  const { isInitialized, user, conference } = useContext(DolbyIOContext);

  if (!isInitialized) {
    return <InitializationScreen />;
  } else if (!user) {
    return <LoginScreen />;
  } else if (!conference) {
    return <JoinScreen />;
  } else {
    return <ConferenceScreen />;
  }
};

export default Main;

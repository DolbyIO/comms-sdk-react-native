/* eslint-disable no-undef */

jest.mock('react-native', () => {
  const RN: any = jest.requireActual('react-native');
  RN.NativeModules.CommsAPIModule = {
    initialize: jest.fn(),
    initializeToken: jest.fn(),
    onAccessTokenOk: jest.fn(),
    onAccessTokenKo: jest.fn(),
    removeListeners: jest.fn(),
    addListener: jest.fn(),
  };
  RN.NativeModules.CommsAPIConferenceServiceModule = {
    create: jest.fn(),
    fetch: jest.fn(),
    current: jest.fn(),
    replay: jest.fn(),
    getAudioLevel: jest.fn(),
    getAudioProcessing: jest.fn(),
    getLocalStats: jest.fn(),
    getMaxVideoForwarding: jest.fn(),
    getParticipant: jest.fn(),
    getParticipants: jest.fn(),
    getStatus: jest.fn(),
    isMuted: jest.fn(),
    isSpeaking: jest.fn(),
    setAudioProcessing: jest.fn(),
    setMaxVideoForwarding: jest.fn(),
    mute: jest.fn(),
    updatePermissions: jest.fn(),
    startAudio: jest.fn(),
    startVideo: jest.fn(),
    stopAudio: jest.fn(),
    stopVideo: jest.fn(),
    join: jest.fn(),
    listen: jest.fn(),
    kick: jest.fn(),
    leave: jest.fn(),
    startScreenShare: jest.fn(),
    stopScreenShare: jest.fn(),
    setSpatialDirection: jest.fn(),
    setSpatialEnvironment: jest.fn(),
    setSpatialPosition: jest.fn(),
  };
  RN.NativeModules.CommsAPISessionServiceModule = {
    open: jest.fn(),
    close: jest.fn(),
    isOpen: jest.fn(),
    getParticipant: jest.fn(),
    updateParticipantInfo: jest.fn(),
  };
  RN.NativeModules.CommsAPINotificationServiceModule = {
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    invite: jest.fn(),
    decline: jest.fn(),
  };
  RN.NativeModules.CommsAPIRecordingServiceModule = {
    current: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
  };
  RN.NativeModules.CommsAPICommandServiceModule = {
    send: jest.fn(),
  };
  RN.NativeModules.CommsAPIFilePresentationServiceModule = {
    stop: jest.fn(),
    start: jest.fn(),
    getThumbnail: jest.fn(),
    setPage: jest.fn(),
    convert: jest.fn(),
    getCurrent: jest.fn(),
    getImage: jest.fn(),
  };
  RN.NativeModules.CommsAPIVideoPresentationServiceModule = {
    pause: jest.fn(),
    play: jest.fn(),
    seek: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    current: jest.fn(),
    state: jest.fn(),
  };
  RN.NativeModules.CommsAPIMediaDeviceServiceModule = {
    isFrontCamera: jest.fn(),
    getComfortNoiseLevel: jest.fn(),
    setComfortNoiseLevel: jest.fn(),
    switchCamera: jest.fn(),
    switchSpeaker: jest.fn(),
  };

  RN.NativeModules.CommsAPIAudioPreviewModule = {
    play: jest.fn(),
    record: jest.fn(),
    stop: jest.fn(),
    release: jest.fn(),
    status: jest.fn(),
    getCaptureMode: jest.fn(),
    setCaptureMode: jest.fn(),
  };
  return RN;
});

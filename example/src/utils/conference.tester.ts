import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type {
  Participant,
  Conference,
  ParticipantPermissions,
  AudioProcessingOptions,
  SpatialDirection,
  SpatialScale,
  SpatialPosition,
  VideoForwardingStrategy,
} from '../../../src/services/conference/models';

export const current = async () => {
  try {
    const conf = await CommsAPI.conference.current();
    Alert.alert('Current conference', JSON.stringify(conf, null, 2));
  } catch (e: any) {
    console.log(e);
    Alert.alert('Error');
  }
};
export const replay = async (conference: Conference) => {
  try {
    await CommsAPI.conference.replay(conference);
  } catch (e: any) {
    Alert.alert('Error');
  }
};

export const getAudioLevel = async (user: Participant) => {
  try {
    const audioLevel = await CommsAPI.conference.getAudioLevel(user);
    Alert.alert('Audio level', JSON.stringify(audioLevel));
  } catch (e: any) {
    Alert.alert('Cant get audio level', e);
  }
};

export const getStatus = async (conference: Conference) => {
  try {
    const status = await CommsAPI.conference.getStatus(conference);
    Alert.alert('Status', JSON.stringify(status));
  } catch (e: any) {
    Alert.alert('Cant get status', e);
  }
};

export const getLocalStats = async () => {
  try {
    const localStats = await CommsAPI.conference.getLocalStats();
    Alert.alert('Local stats', JSON.stringify(localStats));
  } catch (e: any) {
    Alert.alert('Cant get local stats', e);
  }
};

export const getMaxVideoForwarding = async () => {
  try {
    const maxVideoForwarding =
      await CommsAPI.conference.getMaxVideoForwarding();
    Alert.alert('Max video forwarding', JSON.stringify(maxVideoForwarding));
  } catch (e: any) {
    Alert.alert('Cant get max video forwarding', e.toString());
  }
};

export const getSpatialAudioStyle = async () => {
  try {
    const current =
      await CommsAPI.conference.current();
    Alert.alert('Spatial audio style', current?.spatialAudioStyle?.toString());
  } catch (e: any) {
    Alert.alert('Cant get spatial audio style', e.toString());
  }
};

export const kick = async (participant: Participant) => {
  try {
    console.log('KICKED PARTICIPANT', JSON.stringify(participant, null, 2));
    await CommsAPI.conference.kick(participant);
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};

export const mute = async (participant: Participant) => {
  try {
    await CommsAPI.conference.mute(participant, true);
    Alert.alert('Mute success');
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};

export const unmute = async (participant: Participant) => {
  try {
    await CommsAPI.conference.mute(participant, false);
    Alert.alert('Unmute success');
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};

export const startRemoteAudio = async (participant: Participant) => {
  try {
    await CommsAPI.audio.getRemote().start(participant);
    Alert.alert('Start remote audio success');
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};

export const stopRemoteAudio = async (participant: Participant) => {
  try {
    await CommsAPI.audio.getRemote().stop(participant);
    Alert.alert('Stop remote audio success');
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};

export const getParticipant = async (participantId: string) => {
  try {
    const participant: Participant = await CommsAPI.conference.getParticipant(
      participantId
    );
    Alert.alert('Participant:', JSON.stringify(participant));
  } catch (e: any) {
    Alert.alert('getParticipant error', e.toString());
  }
};

export const getParticipants = async (conference: Conference) => {
  try {
    const participants = await CommsAPI.conference.getParticipants(conference);
    Alert.alert('Participants:', JSON.stringify(participants));
  } catch (e: any) {
    Alert.alert('getParticipants error', e.toString());
  }
};

export const isMuted = async () => {
  try {
    const muted = await CommsAPI.conference.isMuted();
    Alert.alert('muted:', muted.toString());
  } catch (e: any) {
    Alert.alert('isMuted error', e.toString());
  }
};

export const isSpeaking = async (participant: Participant) => {
  try {
    const isParticipantSpeaking = await CommsAPI.conference.isSpeaking(
      participant
    );
    Alert.alert(
      `is Participant ${
        participant.info.name
      } speaking: ${isParticipantSpeaking.toString()}`
    );
  } catch (e: any) {
    Alert.alert(e, 'isSpeaking error');
  }
};

export const setAudioProcessing = async (options: AudioProcessingOptions) => {
  try {
    await CommsAPI.conference.setAudioProcessing(options);
    Alert.alert('setAudioProcessing success');
  } catch (e: any) {
    Alert.alert('setAudioProcessing error', e.toString());
  }
};

export const setMaxVideoForwarding = async (max: number) => {
  try {
    await CommsAPI.conference.setMaxVideoForwarding(max);
    Alert.alert('setMaxVideoForwarding success');
  } catch (e: any) {
    Alert.alert('setMaxVideoForwarding error', e.toString());
  }
};

export const videoForwarding = async (max: number, strategy: VideoForwardingStrategy) => {
  try {
    await CommsAPI.conference.videoForwarding({
      max,
      participants: [],
      strategy,
    });
    Alert.alert('videoForwarding success');
  } catch (e: any) {
    Alert.alert('videoForwarding error', e.toString());
  }
};

export const updatePermissions = async (
  participantPermissions: ParticipantPermissions[]
) => {
  try {
    await CommsAPI.conference.updatePermissions(participantPermissions);
  } catch (e: any) {
    Alert.alert('updatePermissions error', e.toString());
  }
};

export const startScreenShare = async () => {
  try {
    await CommsAPI.conference.startScreenShare();
    Alert.alert('Screen sharing started');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Start screen sharing error', msg);
  }
};

export const stopScreenShare = async () => {
  try {
    await CommsAPI.conference.stopScreenShare();
    Alert.alert('Screen sharing stopped');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Stop screen sharing error', msg);
  }
};

export const setSpatialDirection = async (
  spatialDirection: SpatialDirection
) => {
  try {
    await CommsAPI.conference.setSpatialDirection(spatialDirection);
    Alert.alert('setSpatialDirection success');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('setSpatialDirection error', msg);
  }
};

export const setSpatialEnvironment = async (
  scale: SpatialScale,
  forward: SpatialPosition,
  up: SpatialPosition,
  right: SpatialPosition
) => {
  try {
    await CommsAPI.conference.setSpatialEnvironment(
      scale,
      forward,
      up,
      right
    );
    Alert.alert('setSpatialEnvironent success');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('setSpatialEnvironment error', msg);
  }
};

export const setSpatialPosition = async (
  participant: Participant,
  position: SpatialPosition
) => {
  try {
    await CommsAPI.conference.setSpatialPosition(participant, position);
    Alert.alert('setSpatialPosition success');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('setSpatialPosition error', msg);
  }
};

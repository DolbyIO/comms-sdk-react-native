export interface Conference {
  /** The conference ID. */
  id?: string;
  /** The conference alias. */
  alias?: string;
  /** Checks if the created conference is new. */
  isNew?: boolean;
  /** Gets information about conference participants. */
  participants: Participant[];
  /** Provides the current conference status. */
  status: ConferenceStatus;
}

export enum ConferenceStatus {
  /** Default status */
  DEFAULT = 'DEFAULT',
  /** Informs that the conference is creating */
  CREATING = 'CREATING',
  /** Informs that a new conference is created. */
  CREATED = 'CREATED',
  /** Informs that the local participant is joining a conference. */
  JOINING = 'JOINING',
  /** Informs that the local participant successfully joined a conference. */
  JOINED = 'JOINED',
  /** @deprecated */
  FIRST_PARTICIPANT = 'FIRST_PARTICIPANT',
  /** @deprecated */
  NO_MORE_PARTICIPANT = 'NO_MORE_PARTICIPANT',
  /** Informs that the local participant is leaving a conference. */
  LEAVING = 'LEAVING',
  /** Informs that the local participant successfully left a conference. */
  LEFT = 'LEFT',
  /** Informs that an error occurred during a conference. */
  ERROR = 'ERROR',
  /** Informs that the conference is destroyed. This status may be triggered by the following situations:

  All conference participants left the conference
  The time to live or the conference time limit elapsed
  The conference creator used the Terminate REST API to terminate an ongoing conference */
  DESTROYED = 'DESTROYED',
  /** Informs that a conference is ended. */
  ENDED = 'ENDED',
}

export interface ConferenceCreateParameters {
  /** The time to live that enables customizing the waiting time (in seconds) and terminating empty conferences.
  The Voxeet service terminates conferences after the established time if no one has joined the new conference or the last participant has left it. The default value is 0 seconds. */
  ttl?: number;
  /** The bitrate adaptation mode for the video transmission. The rtcpMode triggers the server to monitor the receivers’ available bandwidth. Based on the analyzed value, the server informs the video sender to automatically adjust the quality of the transmitted video streams. */
  rtcpMode?: RTCPMode;
  // TODO - doc
  mode?: Mode;
  /** The preferred video codec that is used during conferences, either H264 or VP8. By default, the value is set to H264. */
  videoCodec?: Codec;
  /** Turns the live recording on and off. */
  liveRecording?: boolean;
  /** Enable Dolby Voice */
  dolbyVoice?: boolean;
  /** Turns the simulcast on and off. */
  simulcast?: boolean;
}

export interface ConferenceCreateOptions {
  /** The conference alias. */
  alias?: string;
  /** The conference parameters. */
  params?: ConferenceCreateParameters;
}

export interface ConferenceReplayOptions {
  /** The conference access token. */
  conferenceAccessToken?: string;
  /** Allows the application users to start replaying the recorded conference at a specific timestamp. The offset is the number of milliseconds between the beginning of the recording and the required starting point. */
  offset: number;
}

export interface ConferenceMixingOptions {
  /** A boolean value that notifies the server whether the participant is a Mixer (true) or not (false). */
  enabled: boolean;
}

export interface Participant {
  /**  The participant's ID. */
  id: string;
  /** The current participant's status. */
  conferenceStatus?: string;
  /** The participant's external ID. */
  externalId?: string;
  /** The participant's name. */
  name?: string;
  /** The URL of the participant's avatar. */
  avatarUrl?: string;
}

export enum RTCPMode {
  /** Adjusts the transmission bitrate to the receiver who has the worst network conditions */
  WORST = 'worst',
  /** Averages the available bandwidth of all the receivers and adjusts the transmission bitrate to this value */
  AVERAGE = 'average',
  /** Does not adjust the transmission bitrate to the receiver’s bandwidth */
  BEST = 'best',
}

export enum Mode {
  // TODO - doc
  STANDARD = 'standard',
  // TODO - doc
  PUSH = 'push',
}

export enum Codec {
  // TODO - doc
  VP8 = 'VP8',
  /** Default */
  H264 = 'H264',
}

export interface ConferenceLeaveOptions {
  /** A boolean indicating whether the SDK should close a session after leaving a conference or leave a session open. */
  leaveRoom: boolean;
}

export enum UserType {
  /** A participant who can send and receive the audio and video stream during the conference. */
  USER = 'user',
  /** A participant who cannot send the audio and video stream during the conference. */
  LISTENER = 'listener',
}

export interface JoinUserInfo {
  /** The UserType model represents the types of conference participants. */
  type?: UserType;
}

export interface ConferenceJoinOptions {
  /** Information about the joining user */
  user?: JoinUserInfo;
  /** Sets the maximum number of video streams that may be transmitted to the joining participant. The valid parameter's values are between 0 and 25 for desktop browsers and between 0 and 4 for mobile browsers. In the case of providing a value smaller than 0 or greater than the valid values, SDK triggers the VideoForwardingError. If the parameter value is not specified, the SDK automatically sets the maximum possible value: 25 for desktop browsers and 4 for mobile browsers. */
  maxVideoForwarding?: number;
}

export interface ParticipantPermissions {
  /** The invited participant. */
  participant: Participant;
  /** The participant's permissions. */
  permissions: Array<ConferencePermission>;
}

export enum ConferencePermission {
  /** Allows a participant to invite participants to a conference. */
  INVITE,
  /** Allows a participant to kick other participants from a conference */
  KICK,
  /** Allows a participant to update other participants' permissions. */
  UPDATE_PERMISSIONS,
  /** Allows a participant to join a conference. */
  JOIN,
  /** Allows a participant to send an audio stream during a conference. */
  SEND_AUDIO,
  /** Allows a participant to send a video stream during a conference. */
  SEND_VIDEO,
  /** Allows a participant to share a screen during a conference. */
  SHARE_SCREEN,
  /** Allows a participant to share a video during a conference. */
  SHARE_VIDEO,
  /** Allows a participant to share a file during a conference. */
  SHARE_FILE,
  /** Allows a participant to send a message to other participants during a conference. */
  SEND_MESSAGE,
  /** Allows a participant to record a conference. */
  RECORD,
  /** Allows a participant to stream a conference. */
  STREAM,
}

export interface AudioProcessingOptions {
  /** The AudioProcessingSenderOptions model allows enabling and disabling audio processing for the local participant who transmits an audio stream. */
  send?: AudioProcessingSenderOptions;
}

export interface AudioProcessingSenderOptions {
  /** A boolean value that indicates whether the audio processing is enabled or disabled. */
  audioProcessing?: boolean;
}

export enum AudioProcessing {
  /** Enables audio processing to offer a high-quality voice communication */
  VOCAL,
  /** Disables audio processing to transmit background sounds, such as music */
  ENVIRONMENT,
}

import ConferenceService from '../ConferenceService';
import type { Conference } from '../models';
import {
  ConferenceStatus,
  ConferenceReplayOptions,
  ConferenceMixingOptions,
  ParticipantPermissions,
  ConferencePermission,
  Participant,
} from '../models';
import { NativeModules } from 'react-native';

const { DolbyIoIAPIConferenceService } = NativeModules;

const testParticipant: Participant = {
  id: '123',
  info: {
    name: 'John Doe',
  },
};

const testConference: Conference = {
  participants: [{ id: '123', info: { name: 'John Doe' } }],
  status: ConferenceStatus.DEFAULT,
};

const testConferenceReplayOptions: ConferenceReplayOptions = {
  offset: 1,
};

const testConferenceMixingOptions: ConferenceMixingOptions = {
  enabled: true,
};

const testParticipantPermissions: ParticipantPermissions = {
  participant: {
    id: '123',
    info: {
      name: 'John Doe',
    },
  },
  permissions: [
    ConferencePermission.INVITE,
    ConferencePermission.JOIN,
    ConferencePermission.RECORD,
  ],
};

describe('ConferenceService', () => {
  describe('create()', () => {
    it('should invoke exported create method with correct arguments', () => {
      const options = {
        alias: 'Example conference',
      };
      ConferenceService.create(options);
      expect(DolbyIoIAPIConferenceService.create).toHaveBeenCalledWith(options);
    });

    it('should invoke exported create method with empty object when invoked parameterless', () => {
      ConferenceService.create();
      expect(DolbyIoIAPIConferenceService.create).toHaveBeenLastCalledWith({});
    });
  });

  describe('fetch()', () => {
    it('should invoke exported fetch method', () => {
      ConferenceService.fetch();
      expect(DolbyIoIAPIConferenceService.fetch).toHaveBeenCalled();
    });
  });

  describe('current()', () => {
    it('should invoke exported current method', () => {
      ConferenceService.current();
      expect(DolbyIoIAPIConferenceService.current).toHaveBeenCalled();
    });
  });

  describe('replay()', () => {
    it('should invoke exported replay method with correct arguments', () => {
      ConferenceService.replay(
        testConference,
        testConferenceReplayOptions,
        testConferenceMixingOptions
      );
      expect(DolbyIoIAPIConferenceService.replay).toHaveBeenCalledWith(
        testConference,
        testConferenceReplayOptions,
        testConferenceMixingOptions
      );
    });

    it('without replay options should invoke exported replay method with replay offset param set to 0', () => {
      ConferenceService.replay(
        testConference,
        undefined,
        testConferenceMixingOptions
      );
      expect(DolbyIoIAPIConferenceService.replay).toHaveBeenCalledWith(
        testConference,
        {
          offset: 0,
        },
        testConferenceMixingOptions
      );
    });
  });

  describe('getAudioLevel()', () => {
    it('should invoke exported getAudioLevel method with correct arguments', () => {
      ConferenceService.getAudioLevel(testParticipant);
      expect(DolbyIoIAPIConferenceService.getAudioLevel).toHaveBeenCalledWith(
        testParticipant
      );
    });
  });

  describe('getLocalStats()', () => {
    it('should invoke exported getLocalStats method', () => {
      ConferenceService.getLocalStats();
      expect(DolbyIoIAPIConferenceService.getLocalStats).toHaveBeenCalled();
    });
  });

  describe('getMaxVideoForwarding()', () => {
    it('should invoke exported getMaxVideoForwarding method', () => {
      ConferenceService.getMaxVideoForwarding();
      expect(
        DolbyIoIAPIConferenceService.getMaxVideoForwarding
      ).toHaveBeenCalled();
    });
  });

  describe('getParticipant()', () => {
    it('should invoke exported getParticipant method', () => {
      ConferenceService.getParticipant();
      expect(DolbyIoIAPIConferenceService.getParticipant).toHaveBeenCalled();
    });
  });

  describe('getParticipants', () => {
    it('should invoke exported getParticipants method with correct arguments', () => {
      ConferenceService.getParticipants(testConference);
      expect(DolbyIoIAPIConferenceService.getParticipants).toHaveBeenCalledWith(
        testConference
      );
    });
  });

  describe('getStatus()', () => {
    it('should invoke exported getStatus method with correct arguments', () => {
      ConferenceService.getStatus(testConference);
      expect(DolbyIoIAPIConferenceService.getStatus).toHaveBeenCalledWith(
        testConference
      );
    });
  });

  describe('isOutputMuted()', () => {
    it('should invoke exported isOutputMuted method', () => {
      ConferenceService.isOutputMuted();
      expect(DolbyIoIAPIConferenceService.isOutputMuted).toHaveBeenCalled();
    });
  });

  describe('isMuted()', () => {
    it('should invoke exported isMuted method', () => {
      ConferenceService.isMuted();
      expect(DolbyIoIAPIConferenceService.isMuted).toHaveBeenCalled();
    });
  });

  describe('isSpeaking()', () => {
    it('should invoke exported isSpeaking method with correct arguments', () => {
      ConferenceService.isSpeaking(testParticipant);
      expect(DolbyIoIAPIConferenceService.isSpeaking).toHaveBeenCalledWith(
        testParticipant
      );
    });
  });

  describe('setAudioProcessing()', () => {
    it('should invoke exported setAudioProcessing method with correct arguments', () => {
      ConferenceService.setAudioProcessing({});
      expect(
        DolbyIoIAPIConferenceService.setAudioProcessing
      ).toHaveBeenCalledWith({});
    });

    it('should invoke exported setAudioProcessing method with empty object when invoked parameterless', () => {
      ConferenceService.setAudioProcessing();
      expect(
        DolbyIoIAPIConferenceService.setAudioProcessing
      ).toHaveBeenCalledWith({});
    });
  });

  describe('setMaxVideoForwarding()', () => {
    it('should invoke exported setMaxVideoForwarding method with correct arguments', () => {
      ConferenceService.setMaxVideoForwarding(2);
      expect(
        DolbyIoIAPIConferenceService.setMaxVideoForwarding
      ).toHaveBeenCalledWith(2);
    });

    it('should invoke exported setMaxVideoForwarding method with 4 int when parameterless', () => {
      ConferenceService.setMaxVideoForwarding();
      expect(
        DolbyIoIAPIConferenceService.setMaxVideoForwarding
      ).toHaveBeenCalledWith(4);
    });
  });

  describe('mute()', () => {
    it('should invoke exported mute method with correct arguments', () => {
      ConferenceService.mute(true, testParticipant);
      expect(DolbyIoIAPIConferenceService.mute).toHaveBeenCalledWith(
        true,
        testParticipant
      );
    });
  });

  describe('updatePermissions()', () => {
    it('should invoke exported updatePermissions method with correct arguments', () => {
      ConferenceService.updatePermissions([testParticipantPermissions]);
      expect(
        DolbyIoIAPIConferenceService.updatePermissions
      ).toHaveBeenCalledWith([testParticipantPermissions]);
    });
  });

  describe('startAudio()', () => {
    it('should invoke exported startAudio method with correct arguments', () => {
      ConferenceService.startAudio(testParticipant);
      expect(DolbyIoIAPIConferenceService.startAudio).toHaveBeenCalledWith(
        testParticipant
      );
    });
  });

  describe('startVideo()', () => {
    it('should invoke exported startVideo method with correct arguments', () => {
      ConferenceService.startVideo(testParticipant);
      expect(DolbyIoIAPIConferenceService.startVideo).toHaveBeenCalledWith(
        testParticipant
      );
    });
  });

  describe('stopAudio()', () => {
    it('should invoke exported stopAudio method with correct arguments', () => {
      ConferenceService.stopAudio(testParticipant);
      expect(DolbyIoIAPIConferenceService.stopAudio).toHaveBeenCalledWith(
        testParticipant
      );
    });
  });

  describe('stopVideo()', () => {
    it('should invoke exported stopVideo method with correct arguments', () => {
      ConferenceService.stopVideo(testParticipant);
      expect(DolbyIoIAPIConferenceService.stopVideo).toHaveBeenCalledWith(
        testParticipant
      );
    });
  });

  describe('join()', () => {
    it('should invoke exported join method with correct arguments', () => {
      ConferenceService.join(testConference, {});
      expect(DolbyIoIAPIConferenceService.join).toHaveBeenCalledWith(
        testConference,
        {}
      );
    });
  });

  describe('kick()', () => {
    it('should invoke exported kick method with correct arguments', () => {
      ConferenceService.kick(testParticipant);
      expect(DolbyIoIAPIConferenceService.kick).toHaveBeenCalledWith(
        testParticipant
      );
    });
  });

  describe('leave()', () => {
    it('should invoke exported leave method', () => {
      ConferenceService.leave();
      expect(DolbyIoIAPIConferenceService.leave).toHaveBeenCalled();
    });
  });

  // TODO "onStatusChange" method
  // TODO "onPermissionsChange" method
  // TODO "onParticipantsChange" method
  // TODO "onStreamsChange" method
});

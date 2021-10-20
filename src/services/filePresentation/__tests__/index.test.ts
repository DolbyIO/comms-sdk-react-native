import { NativeModules } from 'react-native';

import FilePresentationService from '../FilePresentationService';
import { FilePresentationServiceEventNames } from '../events';

const { DolbyIoIAPIFilePresentationService } = NativeModules;

const testFileConverted = {
  id: '102030',
  imageCount: 3,
};

const testFile = {
  url: '../../../../example/src/assets/dolbyIo.jpg',
};

describe('FilePresentationService', () => {
  FilePresentationService._nativeEvents.addListener = jest.fn();

  describe('stop()', () => {
    it('should invoke exported method', () => {
      FilePresentationService.stop();
      expect(DolbyIoIAPIFilePresentationService.stop).toHaveBeenCalled();
    });
  });

  describe('start()', () => {
    it('should invoke exported method with correct arguments', () => {
      FilePresentationService.start(testFileConverted);
      expect(DolbyIoIAPIFilePresentationService.start).toHaveBeenCalledWith(
        testFileConverted
      );
    });
  });

  describe('getThumbnail()', () => {
    it('should invoke exported method with correct arguments', () => {
      FilePresentationService.getThumbnail(1);
      expect(
        DolbyIoIAPIFilePresentationService.getThumbnail
      ).toHaveBeenCalledWith(1);
    });
  });

  describe('setPage()', () => {
    it('should invoke exported method with correct arguments', () => {
      FilePresentationService.setPage(2);
      expect(DolbyIoIAPIFilePresentationService.setPage).toHaveBeenCalledWith(
        2
      );
    });
  });

  describe('convert()', () => {
    it('should invoke exported method with correct arguments', () => {
      FilePresentationService.convert(testFile);
      expect(DolbyIoIAPIFilePresentationService.convert).toHaveBeenCalledWith(
        testFile
      );
    });
  });

  describe('getCurrent()', () => {
    it('should invoke exported method', () => {
      FilePresentationService.getCurrent();
      expect(DolbyIoIAPIFilePresentationService.getCurrent).toHaveBeenCalled();
    });
  });

  describe('getImage()', () => {
    it('should invoke exported method with correct arguments', () => {
      FilePresentationService.getImage(2);
      expect(DolbyIoIAPIFilePresentationService.getImage).toHaveBeenCalledWith(
        2
      );
    });
  });

  describe('onFileConverted()', () => {
    it('should invoke NativeEvents.addListener with FileConverted event', () => {
      FilePresentationService.onFileConverted(() => {});
      expect(
        FilePresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        FilePresentationServiceEventNames.FileConverted,
        expect.any(Function)
      );
    });
  });

  describe('onFilePresentationChange()', () => {
    it('should invoke NativeEvents.addListener with FilePresentationStarted event', () => {
      FilePresentationService.onFilePresentationChange(() => {});
      expect(
        FilePresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        FilePresentationServiceEventNames.FilePresentationStarted,
        expect.any(Function)
      );
    });

    it('should invoke NativeEvents.addListener with FilePresentationStopped event', () => {
      FilePresentationService.onFilePresentationChange(() => {});
      expect(
        FilePresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        FilePresentationServiceEventNames.FilePresentationStopped,
        expect.any(Function)
      );
    });

    it('should invoke NativeEvents.addListener with FilePresentationUpdated event', () => {
      FilePresentationService.onFilePresentationChange(() => {});
      expect(
        FilePresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        FilePresentationServiceEventNames.FilePresentationUpdated,
        expect.any(Function)
      );
    });
  });
});

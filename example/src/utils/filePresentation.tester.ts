import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type {
  FileConverted,
  File,
} from '../../../src/services/filePresentation/models';

export const stop = async () => {
  try {
    await CommsAPI.filePresentation.stop();
    console.log('File presentation stopped');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Stop error', msg);
  }
};

export const start = async (file: FileConverted | null) => {
  try {
    if (file == null) return;
    console.log('file that were passing', file);
    await CommsAPI.filePresentation.start(file);
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Start error', msg);
  }
};

export const getThumbnail = async (page: number) => {
  try {
    const thumbnail = await CommsAPI.filePresentation.getThumbnail(page);
    Alert.alert('Thumbnail:', thumbnail.toString());
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Get thumbnail error', msg);
  }
};

export const setPage = async (page: number) => {
  try {
    await CommsAPI.filePresentation.setPage(page);
    Alert.alert('Set page done');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Set page error', msg);
  }
};

export const convert = async (file: File): Promise<FileConverted | null> => {
  try {
    const convertedFile = await CommsAPI.filePresentation.convert(file);
    console.log('File Conversion done', JSON.stringify(convertedFile, null, 2));
    return convertedFile;
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Convert error', msg);
    return null;
  }
};

export const getCurrent = async () => {
  try {
    const currentFilePresentation =
      await CommsAPI.filePresentation.getCurrent();
      Alert.alert(
        'Current file presentation',
        JSON.stringify(
          {
            id: currentFilePresentation.id,
            imageCount: currentFilePresentation.imageCount,
            owner: currentFilePresentation.owner,
            position: currentFilePresentation.position,
          },
          null,
          2
        )
      );
    console.log('Get current done:', JSON.stringify(currentFilePresentation, null, 2));
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Get current error', msg);
  }
};

export const getImage = async (page: number) => {
  try {
    const image = await CommsAPI.filePresentation.getImage(page);
    console.log('Get image done:', image);
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Get image error', msg);
  }
};

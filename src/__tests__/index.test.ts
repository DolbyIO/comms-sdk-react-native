import DolbyIoIAPI from '../DolbyIoIAPI';
import type { RefreshAccessTokenType } from '../models';

/** Mocking function */

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.NativeModules.DolbyIoIAPIModule = {
    initialize: jest.fn(),
    initializeToken: jest.fn(),
  };
  return RN;
});

import { NativeModules } from 'react-native';
const { DolbyIoIAPIModule } = NativeModules;

const mockAPP_ID = 'MOCKED_APP_ID';
const mockAPP_SECRET = 'MOCKED_APP_SECRET';

/** Main module - "initialize" method test */

test('Main module - "initialize" method test', () => {
  DolbyIoIAPI.initialize(mockAPP_ID, mockAPP_SECRET);
  expect(DolbyIoIAPIModule.initialize).toHaveBeenCalledWith(
    mockAPP_ID,
    mockAPP_SECRET
  );
});

/** Main module - "initializeToken" method test */
// TODO - toHaveBeenCalledWith(null, mockFunctions) - doesn't work

const mockFunction: RefreshAccessTokenType = () => {
  return 'string';
};

test('Main module - "initializeToken" method test', () => {
  DolbyIoIAPI.initializeToken(null, mockFunction);
  expect(DolbyIoIAPIModule.initializeToken).toHaveBeenCalled();
});

import { NativeModules } from 'react-native';

import NativeEvents from '../../utils/NativeEvents';
import type { MessageReceivedEventType } from './events';
import { CommandServiceEventNames } from './events';

const { DolbyIoIAPICommandServiceModule } = NativeModules;

/**
 * @class CommandService
The Command service allows the application to send text messages or notifications to all conference participants.
The service also emits an received event to inform the application about received messages.
 */
export class CommandService {
  /** @internal */
  _nativeModule = DolbyIoIAPICommandServiceModule;
  /** @internal */
  _nativeEvents = new NativeEvents(DolbyIoIAPICommandServiceModule);

  /**
   * Sends a message, in the form of a basic stream, to all conference participants.
   * @param message<string> Message to send
   */
  public async send(message: string): Promise<void> {
    return this._nativeModule.send(message);
  }

  /**
   * Adds a native listener for message received
   * @param handler<(data: MessageReceivedEventType) => void> Handling function
   * @returns {() => void} Function that removes handler
   */
  public onMessageReceived(
    handler: (data: MessageReceivedEventType) => void
  ): () => void {
    return this._nativeEvents.addListener(
      CommandServiceEventNames.MessageReceived,
      handler
    );
  }
}

export default new CommandService();

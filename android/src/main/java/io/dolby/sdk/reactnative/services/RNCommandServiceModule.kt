package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.voxeet.sdk.services.CommandService
import com.voxeet.sdk.services.ConferenceService
import io.dolby.sdk.reactnative.utils.Promises
import io.dolby.sdk.reactnative.utils.Promises.forward
import io.dolby.sdk.reactnative.utils.Promises.rejectIfNull
import io.dolby.sdk.reactnative.utils.Promises.thenPromise

/**
 * The [RNCommandServiceModule] allows the application to send [send] text messages to all other participants of
 * a specific conference.
 *
 * @constructor
 * Creates a bridge wrapper for [CommandService].
 *
 * @param conferenceService [ConferenceService] from Android SDK
 * @param commandService    [CommandService] from Android SDK
 * @param reactContext      react context
 */
class RNCommandServiceModule(
  reactContext: ReactApplicationContext,
  private val conferenceService: ConferenceService,
  private val commandService: CommandService
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "DolbyIoIAPICommandServiceModule"

  /**
   * Sends the message to the conference. The message must be in the form of a string or a representation of strings (json or
   * base64).
   *
   * @param message content of the message (any possible string)
   * @param promise returns null
   */
  @ReactMethod
  fun send(message: String, promise: Promise) {
    Promises.promise(conferenceService.conferenceId) { "Couldn't find the conference" }
      .thenPromise { conferenceId -> commandService.send(conferenceId, message) }
      .rejectIfNull { "Send message operation failed" }
      .forward(promise)
  }
}

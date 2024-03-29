package io.dolby.sdk.comms.reactnative.services

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.json.ParticipantInvited
import com.voxeet.sdk.models.Conference
import com.voxeet.sdk.push.center.subscription.register.BaseSubscription
import com.voxeet.sdk.services.ConferenceService
import com.voxeet.sdk.services.NotificationService
import io.dolby.sdk.comms.reactnative.eventemitters.RNNotificationEventEmitter
import io.dolby.sdk.comms.reactnative.mapper.ConferenceMapper
import io.dolby.sdk.comms.reactnative.mapper.InvitationMapper
import io.dolby.sdk.comms.reactnative.mapper.SubscribeMapper
import io.dolby.sdk.comms.reactnative.utils.Promises
import io.dolby.sdk.comms.reactnative.utils.Promises.forward
import io.dolby.sdk.comms.reactnative.utils.Promises.rejectIfFalse
import io.dolby.sdk.comms.reactnative.utils.Promises.thenPromise
import io.dolby.sdk.comms.reactnative.utils.Promises.thenValue
import io.dolby.sdk.comms.reactnative.utils.ReactPromise

/**
 * The [RNNotificationServiceModule] allows inviting participants to a conference.
 *
 * The application calls the [invite] method to invite specific participants to a conference.
 * For each invited user application can specify permissions, which allow conference participants to perform a specific set of actions within a protected conference.
 * If permissions are not specified, the platform assigns the default permissions, which include Join, SendAudio, SendVideo, ShareScreen, ShareVideo, ShareFile, SendMessage, Record, and Stream.
 *
 * Participants who do not wish to participate at a conference can [decline] the conference invitation.
 *
 * @constructor Creates a bridge wrapper for [NotificationService].
 *
 * @param reactContext        react context
 * @param eventEmitter        an emitter for the notification module events
 * @param conferenceService   [ConferenceService] from Android SDK
 * @param notificationService [NotificationService] from Android SDK
 * @param conferenceMapper    [ConferenceMapper] mapper for a [Conference] and [Conference]-related models
 * @param invitationMapper    [InvitationMapper] mapper for a [ParticipantInvited] model
 */
class RNNotificationServiceModule constructor(
  reactContext: ReactApplicationContext,
  eventEmitter: RNNotificationEventEmitter,
  private val conferenceService: ConferenceService,
  private val notificationService: NotificationService,
  private val conferenceMapper: ConferenceMapper,
  private val invitationMapper: InvitationMapper
) : RNEventEmitterModule(reactContext, eventEmitter) {

  override fun getName(): String = "CommsAPINotificationServiceModule"

  /**
   * Notifies conference participants about a conference invitation.
   *
   * The ParticipantInfo model included in the invitation has to include externalId.
   *
   * In the case of inviting participants to a conference that is not protected, inviters can invite participants to any conference.
   * In the case of inviting participants to a protected conference, inviters can invite participants only to the current conference.
   *
   * Participants who have permission to invite additional participants to a conference can also send invitations.
   * In the invitation, inviters can only grant permissions that the inviters have.
   *
   * @param conferenceRN          a conference to invite
   * @param invitedParticipantsRN information about the invited users
   * @param promise               returns null
   */
  @ReactMethod
  fun invite(conferenceRN: ReadableMap, invitedParticipantsRN: ReadableArray, promise: ReactPromise) {
    Promises.promise(conferenceMapper.conferenceIdFromRN(conferenceRN)) { "Conference should contain conferenceId" }
      .thenValue(conferenceService::getConference)
      .thenValue { conference -> conference to invitationMapper.fromRN(invitedParticipantsRN) }
      .thenPromise { (conference, participants) -> notificationService.inviteWithPermissions(conference, participants) }
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Declines the conference invitation.
   *
   * @param conferenceRN a conference to decline
   * @param promise      returns null
   */
  @ReactMethod
  fun decline(conferenceRN: ReadableMap, promise: ReactPromise) {
    Promises.promise(conferenceMapper.conferenceIdFromRN(conferenceRN)) { "Conference should contain conferenceId" }
      .thenValue(conferenceService::getConference)
      .thenPromise(notificationService::decline)
      .rejectIfFalse { "Decline invitation operation failed" }
      .forward(promise)
  }

  /**
   * Every emitter module must implement this method in place, otherwise JS cannot receive event
   */
  @ReactMethod
  override fun addListener(eventName: String) = super.addListener(eventName)


  /**
   * Every emitter module must implement this method in place, otherwise JS cannot receive event
   */
  @ReactMethod
  override fun removeListeners(count: Int) = super.removeListeners(count)

  /**
   * Subscribes to the specified notifications.
   * @param subscribeRNList An array of the subscribed subscription types.
   */
  @ReactMethod
  fun subscribe(subscribeRNList: ReadableArray, promise: ReactPromise) {
    val subscribeList = SubscribeMapper.fromRNSubscribeList(subscribeRNList)
    notificationService
      .subscribe(subscribeList)
      .rejectIfFalse {"Subscribe to specific subscribe type failed" }
      .forward(promise)
  }

  /**
   * Unsubscribes from the specified notifications.
   * @param subscribeRNList An array of the subscribed subscription types.
   */
  @ReactMethod
  fun unsubscribe(subscribeRNList: ReadableArray, promise: ReactPromise) {
    val subscribeList = SubscribeMapper.fromRNSubscribeList(subscribeRNList)
    notificationService
      .unsubscribe(subscribeList)
      .rejectIfFalse { "Cannot unsubscribe for given subscribe type" }
      .forward(promise)
  }
}

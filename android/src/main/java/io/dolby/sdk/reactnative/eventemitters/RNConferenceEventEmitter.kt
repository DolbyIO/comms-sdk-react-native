package io.dolby.sdk.reactnative.eventemitters

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.voxeet.sdk.events.sdk.ConferenceStatusUpdatedEvent
import com.voxeet.sdk.events.v2.ParticipantAddedEvent
import com.voxeet.sdk.events.v2.ParticipantUpdatedEvent
import io.dolby.sdk.reactnative.mapper.ConferenceMapper
import io.dolby.sdk.reactnative.mapper.ParticipantMapper
import org.greenrobot.eventbus.Subscribe

/**
 * The conference event emitter
 * @param participantMapper map participant to react JS data
 * @param conferenceMapper map conference to react JS data
 * @param context          react application context for sending event
 */
class RNConferenceEventEmitter(
  private val participantMapper: ParticipantMapper,
  private val conferenceMapper: ConferenceMapper,
  context: ReactApplicationContext
) : RNEventEmitter(context) {

  /**
   * The supported events for JS
   */
  override val eventMap: Map<String, String>
    get() = mapOf(
      /**
       * Participant events
       */
      "EVENT_CONFERENCE_PARTICIPANT_ADDED" to EVENT_PARTICIPANT_ADDED,
      "EVENT_CONFERENCE_PARTICIPANT_UPDATED" to EVENT_PARTICIPANT_UPDATED,
      // JS could get Participant object by this key
      "EVENT_CONFERENCE_PARTICIPANT_KEY" to EVENT_PARTICIPANT_KEY,

      /**
       * Conference status event
       */
      "EVENT_CONFERENCE_STATUS_UPDATE" to EVENT_STATUS_UPDATE,
      // JS could get ConferenceStatus object by this key
      "EVENT_CONFERENCE_STATUS_KEY" to EVENT_STATUS_KEY
    )

  /**
   * New participant add event
   */
  @Subscribe
  fun on(event: ParticipantAddedEvent) {
    val data = Arguments.createMap().apply {
      putMap(EVENT_PARTICIPANT_KEY, participantMapper.toRN(event.participant))
    }
    send(EVENT_PARTICIPANT_ADDED, data)
  }

  /**
   * Existing participant update event
   */
  @Subscribe
  fun on(event: ParticipantUpdatedEvent) {
    val data = Arguments.createMap().apply {
      putMap(EVENT_PARTICIPANT_KEY, participantMapper.toRN(event.participant))
    }
    send(EVENT_PARTICIPANT_UPDATED, data)
  }

  /**
   * Current conference status update event
   */
  @Subscribe
  fun on(event: ConferenceStatusUpdatedEvent) {
    val data = Arguments.createMap().apply {
      putString(EVENT_STATUS_KEY, conferenceMapper.toRNConferenceStatus(event.state))
    }
    send(EVENT_STATUS_UPDATE, data)
  }

  /**
   * The event names and payload keys, make sure they are unique in the application scope
   */
  companion object {
    const val EVENT_PARTICIPANT_ADDED = "ParticipantAdded"
    const val EVENT_PARTICIPANT_UPDATED = "ParticipantUpdated"
    const val EVENT_PARTICIPANT_KEY = "participant"
    const val EVENT_STATUS_UPDATE = "conferenceStatusUpdated"
    const val EVENT_STATUS_KEY = "conferenceStatus"
  }
}
package io.dolby.sdk.reactnative.models;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.voxeet.sdk.json.ParticipantInfo;
import com.voxeet.sdk.models.Participant;
import com.voxeet.sdk.models.v1.ConferenceParticipantStatus;
import com.voxeet.sdk.models.v1.SdkParticipant;
import com.voxeet.sdk.utils.Opt;

public final class ConferenceParticipantUtil {
    @Deprecated
    public final static String USER_ID = "userId";
    public final static String PARTICIPANT_ID = "participantId";
    public final static String PARTICIPANT_NAME = "name";
    public final static String PARTICIPANT_EXTERNAL_ID = "externalId";
    public final static String PARTICIPANT_AVATAR_URL = "avatarUrl";
    public final static String CONFERENCE_STATUS = "conferenceStatus";

    private ConferenceParticipantUtil() {

    }

    @NonNull
    public static WritableMap toMap(@NonNull Participant user) {
        ParticipantInfo userInfo = user.getInfo();

        WritableMap map = new WritableNativeMap();
        map.putString(USER_ID, user.getId());
        map.putString(PARTICIPANT_ID, user.getId());
        map.putString(CONFERENCE_STATUS, Opt.of(user.getStatus()).or(ConferenceParticipantStatus.UNKNOWN).name());

        if (null != userInfo) {
            if (null != userInfo.getName()) {
                map.putString(PARTICIPANT_NAME, userInfo.getName());
            }
            if (null != userInfo.getExternalId()) {
                map.putString(PARTICIPANT_EXTERNAL_ID, userInfo.getExternalId());
            }
            if (null != userInfo.getAvatarUrl()) {
                map.putString(PARTICIPANT_AVATAR_URL, userInfo.getAvatarUrl());
            }
        }

        return map;
    }


    @NonNull
    public static WritableMap toMap(@Nullable ParticipantInfo participant) {
        WritableMap map = new WritableNativeMap();

        if (null == participant) return map;

        if (null != participant.getName()) {
            map.putString(PARTICIPANT_NAME, participant.getName());
        }
        if (null != participant.getExternalId()) {
            map.putString(PARTICIPANT_EXTERNAL_ID, participant.getExternalId());
        }
        if (null != participant.getAvatarUrl()) {
            map.putString(PARTICIPANT_AVATAR_URL, participant.getAvatarUrl());
        }

        return map;
    }

    public static WritableArray toMap(Iterable<Participant> conferenceUsers) {
        WritableNativeArray array = new WritableNativeArray();
        if (null != conferenceUsers) {
            for (Participant user : conferenceUsers) {
                array.pushMap(toMap(user));
            }
        }
        return array;
    }

    public static WritableMap toMap(SdkParticipant user) {
        WritableMap map = new WritableNativeMap();
        map.putString(PARTICIPANT_ID, user.getUserId());
        map.putString(CONFERENCE_STATUS, Opt.of(user.getStatus()).or(ConferenceParticipantStatus.UNKNOWN.toString()));

        if (null != user.getMetadata()) {
            if (null != user.getMetadata().getExternalName()) {
                map.putString(PARTICIPANT_NAME, user.getMetadata().getExternalName());
            }
            if (null != user.getMetadata().getExternalId()) {
                map.putString(PARTICIPANT_EXTERNAL_ID, user.getMetadata().getExternalId());
            }
            if (null != user.getMetadata().getExternalPhotoUrl()) {
                map.putString(PARTICIPANT_AVATAR_URL, user.getMetadata().getExternalPhotoUrl());
            }
        }

        return map;
    }

    public static ParticipantInfo toParticipantInfo(ReadableMap map) {
        return new ParticipantInfo(map.getString(PARTICIPANT_NAME),
                map.getString(PARTICIPANT_EXTERNAL_ID),
                map.getString(PARTICIPANT_AVATAR_URL));
    }

}
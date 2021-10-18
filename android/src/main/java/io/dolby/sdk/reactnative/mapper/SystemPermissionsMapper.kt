package io.dolby.sdk.reactnative.mapper

import com.facebook.react.bridge.ReadableMap
import io.dolby.sdk.reactnative.android.permissions.Rationale

/**
 *
 */
class SystemPermissionsMapper {

  companion object {
    private const val RATIONALE_TITLE = "title"
    private const val RATIONALE_MESSAGE = "message"
    private const val RATIONALE_POSITIVE_BUTTON = "positiveButton"
    private const val RATIONALE_NEGATIVE_BUTTON = "negativeButton"
  }

  fun fromNative(rationaleMap: ReadableMap): Rationale {
    return Rationale(
      title = requireNotNull(rationaleMap.getString(RATIONALE_TITLE)),
      message = requireNotNull(rationaleMap.getString(RATIONALE_MESSAGE)),
      positiveButton = requireNotNull(rationaleMap.getString(RATIONALE_POSITIVE_BUTTON)),
      negativeButton = rationaleMap.getString(RATIONALE_NEGATIVE_BUTTON)
    )
  }
}

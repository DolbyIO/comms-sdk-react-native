# Dolby.io IAPI React Native SDK

The Dolby.io Communications APIs provide a platform for unified communications and collaboration. You can combine voice, video, and messaging as an integrated solution for your own applications in a way that is cohesive to your end-users. This is in contrast to out-of-app communications where users must exit your application and turn to third-party stand-alone tools.

For example, with the Client SDKs you can build:

A video conference application for your employee portal
A broadcast webinar application for presentations to grow your audience
A 1-on-1 help desk service for your specialized customers

## Requirements

### iOS

* Xcode 12 and iOS SDK 14
* iOS 11.0+ target deployment

### Android

* Minimum Android SDK version - 25

## Installation

1. Install module by `npm` or `yarn`:

    ```bash
    npm install @dolbyio/react-native-iapi-sdk --save
    ```
    ```bash
    yarn add @dolbyio/react-native-iapi-sdk
    ```

2. If you are using React Native >= 0.60, install native dependencies via CocoaPods from your ios directory:

   ```bash
   pod install
   ```

3. Or if you are using React Native < 0.60, link native dependency:

   ```bash
   react-native link @dolbyio/react-native-iapi-sdk
   ```
   and then, install from your ios directory:
   ```bash
   pod install --repo-update
   ```

4. Follow the iOS and Android getting started pages to configure native projects.
   https://docs.dolby.io/communications-apis/docs/create-a-basic-audio-conference-application-for-ios
   https://docs.dolby.io/communications-apis/docs/android-create-basic-audio-conference

## Getting started

1) Import the SDK to your project

```
import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';
```

2) Initialize the SDK with your Dolby.io credentials

```
await DolbyIoIAPI.initialize(APP_ID, APP_SECRET);
```
3) Open a session
```
await DolbyIoIAPI.session.open({ name, externalId });
```
4) Create a conference
```
const conferenceOptions = {
  alias,
  params: {},
};

const createdConference = await DolbyIoIAPI.conference.create(
  conferenceOptions
);
```
4) Join created conference
```
const joinedConference = await DolbyIoIAPI.conference.join(
  createdConference,
  {}
);
```

5) Import some additional services
```
import {Conference} from '@dolbyio/react-native-iapi-sdk';
```
or
```
import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';
const {Conference} = DolbyIoIAPI;
```

## Integrate video

Place VideoView in your component
```
import { VideoView } from '@dolbyio/react-native-iapi-sdk';
...
return (
...
  <VideoView
    style={{ flex: 1 }}
  />
```

Get a reference to your VideoView component
```
const videoView = useRef() as React.MutableRefObject<VideoView>;
...
return (
...
  <VideoView
    style={{ flex: 1 }}
    ref={videoView}
  />
```

Attach a stream to video
```
videoView.current.attach(
  participant,
  participant.streams[participant.streams.length - 1]
);
```

VideoView properties

|Name|Type|Description|
|---|---|---|
|isMirror|boolean |It allows the image to be reflected horizontally   |
|scaleType|'fit' or 'fill'|It allows you to fit the image differently to the canvas|
|style|   |It allows you to style the video window according to React Native standards   |

VideoView methods

|Name|Arguments|Returns|Description|
|---|---|---|---|
|attach()|(participant: Participant,mediaStream: MediaStream)|Promise(boolean)|Allows displaying the stream of participant|
|detach()|none|Promise(boolean)|It allows you to finish displaying the stream|
|isAttached()|none|Promise(boolean)|Gets information about whether the stream is active|
|isScreenSharing()|none|Promise(boolean)|Gets information about whether the active stream is screen-sharing|

## Documentation

Complete list of available services in SDK along with method documentation

[DolbyIoIAPI](docs/classes/DolbyIoIAPI.md)
is the main module that allows the application to interact with Voxeet services. The SDK is asynchronous and uses promise at its core.

[CommandService](docs/classes/_internal_.CommandService.md)
allows the application to send text messages or notifications to all conference participants. The service also emits an received event to inform the application about received messages.

[ConferenceService](docs/classes/_internal_.ConferenceService.md)
allows the application to manage the conference life-cycle and interact with the conference.

[FilePresentationService](docs/classes/_internal_.FilePresentationService.md)
allows the application to manage the conference life-cycle and interact with the conference.

[MediaDeviceService](docs/classes/_internal_.MediaDeviceService.md)
allows the application to manage media devices that are used during conferences.

[NotificationService](docs/classes/_internal_.NotificationService.md)
enables inviting participants to a conference.

[RecordingService](docs/classes/_internal_.RecordingService.md)
allows an application to record conferences by using the start and stop
methods that turn the recording on and off.

[SessionService](docs/classes/_internal_.SessionService.md)
allows opening and closing sessions. Opening a session is mandatory before interacting with any service.

[VideoPresentationService](docs/classes/_internal_.VideoPresentationService.md)
allows sharing videos during a conference.

## License

```
   Copyright 2021 - Dolby

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```

## SDK 3.3 License agreement

Before using the latest version of the @dolbyio/react-native-iapi-sdk, please review and accept the [Dolby Software License Agreement](https://github.com/voxeet/voxeet-sdk-android/blob/main/LICENSE).

## Third Party licenses

Direct licenses can be found [here](./LICENSES.json)

© Dolby, 2021

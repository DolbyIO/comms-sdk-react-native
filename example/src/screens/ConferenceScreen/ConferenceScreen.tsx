import type { Participant } from '../../../../src/services/conference/models';
import { DolbyIOContext } from '@components/DolbyIOProvider';
import COLORS from '@constants/colors.constants';
import Button from '@ui/Button';
import Space from '@ui/Space';
import Text from '@ui/Text';
import {
  startVideo,
  stopVideo,
  startAudio,
  stopAudio,
  getAudioLevel,
  current,
} from '@utils/conference.tester';
import {
  getCurrentRecording,
  startRecording,
  stopRecording,
} from '@utils/recording.tester';
import { sendCommandMessage } from '@utils/command.tester';
import ParticipantAvatar from './ParticipantAvatar';
import styles from './ConferenceScreen.style';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { FunctionComponent, useContext, useRef } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';

const ConferenceScreen: FunctionComponent = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { user, conference, leave } = useContext(DolbyIOContext);
  // @ts-ignore
  const { participants } = conference;

  if (!conference || !user) {
    return <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper} />;
  }

  return (
    <MenuProvider
      customStyles={{
        backdrop: styles.menuBackdrop,
      }}
    >
      <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.top}>
            <Space mh="m" mv="m">
              <Space mb="s" style={styles.topBar}>
                <Text size="xs">Logged as: {user.info.name}</Text>
                <TouchableOpacity style={styles.leaveButton} onPress={leave}>
                  <Text color={COLORS.WHITE}>LEAVE</Text>
                </TouchableOpacity>
              </Space>
              <Text size="s" align="center">
                Conference: <Text weight="bold">{conference.alias}</Text>
              </Text>
            </Space>
          </View>
          <View style={styles.center} />
          <View style={styles.bottom}>
            <Space mh="m" mt="m" mb="xs">
              <Text
                header
                size="s"
              >{`Participants (${participants.length})`}</Text>
            </Space>
            <Space mb="m">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Space mh="m" style={styles.participantsList}>
                  {participants.map((p: Participant) => (
                    <ParticipantAvatar {...p} />
                  ))}
                </Space>
              </ScrollView>
            </Space>
          </View>
        </SafeAreaView>
        <BottomSheet ref={bottomSheetRef} index={0} snapPoints={[65, 500]}>
          <Space mh="m" mb="s">
            <Text header size="s" color={COLORS.BLACK}>
              Actions
            </Text>
          </Space>
          <Space mh="m" mb="m">
            <Space mb="xs">
              <Text size="m" color={COLORS.BLACK}>
                Conference Service
              </Text>
            </Space>
            <Space mb="s" style={styles.actionButtons}>
              <Button
                size="small"
                color="dark"
                text="Get current"
                onPress={current}
              />
            </Space>
            <Space mb="xs">
              <Text size="s" color={COLORS.BLACK}>
                Audio
              </Text>
            </Space>
            <Space mb="s" style={styles.actionButtons}>
              <Button
                size="small"
                color="dark"
                text="Get audio level"
                onPress={() => getAudioLevel(user)}
              />
              <Button
                size="small"
                color="dark"
                text="Start audio"
                onPress={() => startAudio(user)}
              />
              <Button
                size="small"
                color="dark"
                text="Stop audio"
                onPress={() => stopAudio(user)}
              />
            </Space>
            <Space mb="xs">
              <Text size="s" color={COLORS.BLACK}>
                Video
              </Text>
            </Space>
            <Space mb="s" style={styles.actionButtons}>
              <Button
                size="small"
                color="dark"
                text="Start video"
                onPress={() => startVideo(user)}
              />
              <Button
                size="small"
                color="dark"
                text="Stop video"
                onPress={() => stopVideo(user)}
              />
            </Space>
            <Space mb="xs">
              <Text size="s" color={COLORS.BLACK}>
                Recording
              </Text>
            </Space>
            <Space mb="s" style={styles.actionButtons}>
              <Button
                size="small"
                color="dark"
                text="Start recording"
                onPress={startRecording}
              />
              <Button
                size="small"
                color="dark"
                text="Stop recording"
                onPress={stopRecording}
              />
              <Button
                size="small"
                color="dark"
                text="Current recording"
                onPress={getCurrentRecording}
              />
            </Space>
          </Space>
          <Space mb="xs">
            <Text size="s" color={COLORS.BLACK}>
              Command
            </Text>
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Send message"
              onPress={() =>
                sendCommandMessage('message for command service send method')
              }
            />
          </Space>
        </BottomSheet>
      </LinearGradient>
    </MenuProvider>
  );
};

export default ConferenceScreen;

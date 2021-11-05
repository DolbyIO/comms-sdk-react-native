import React from 'react';
import { Text as ReactNativeText } from 'react-native';
import RNToast from 'react-native-toast-message';

import Space from '@ui/Space';
import Text from '@ui/Text';

import styles from './Toast.style';

type ToastProps = {
  props: {
    title: string;
    content: string;
    children: React.ReactChild;
  };
};

const Toast = ({ props }: ToastProps) => (
  <Space mv={'xs'} mt={'xxs'} style={styles.container}>
    <Space pv="xs" ph="xs" pr="l" mr={'s'}>
      <Space style={styles.titleContainer}>
        <Text header size="s" color={'black'}>
          {props.title}
        </Text>
      </Space>

      <Text color="black" size="xs">
        {props.content}
      </Text>
      <Space style={styles.childContainer}>{props.children}</Space>
    </Space>
    <ReactNativeText style={styles.exitIcon} onPress={() => RNToast.hide()}>
      ❌
    </ReactNativeText>
  </Space>
);

export default Toast;

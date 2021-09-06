export enum DeviceType {
  INTERNAL_SPEAKER = 'INTERNAL_SPEAKER',
  EXTERNAL_SPEAKER = 'EXTERNAL_SPEAKER',
  BLUETOOTH = 'BLUETOOTH',
  NORMAL_MEDIA = 'NORMAL_MEDIA',
  WIRED_HEADSET = 'WIRED_HEADSET',
  USB = 'USB',
}

export function toDeviceType(value: DeviceType | string): DeviceType {
  if (typeof value === 'string') return DeviceType[<DeviceType>value];
  return value;
}

export function fromDeviceType(value: DeviceType): string {
  if (typeof value === 'string') return value;
  return DeviceType[value];
}

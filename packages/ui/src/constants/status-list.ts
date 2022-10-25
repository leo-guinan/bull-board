import { KeyOf } from '@leo-guinan/api/typings/utils';
import { STATUSES } from '@leo-guinan/api/src/constants/statuses';

export const STATUS_LIST: Readonly<KeyOf<typeof STATUSES>> = [
  STATUSES.latest as any,
  STATUSES.active,
  STATUSES.waiting,
  STATUSES.completed,
  STATUSES.failed,
  STATUSES.delayed,
  STATUSES.paused,
] as const;

import { ScheduleItem } from './schedule-item';

export interface ScheduleList {
  morning?: ScheduleItem;
  lucnh?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;
  [key: string]: any;
}

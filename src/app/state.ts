import { User } from '../models/user';
import { Meal } from '../models/meal';
import { Workout } from '../models/workout';
import { ScheduleItem } from 'src/models/schedule-item';

export interface State {
  user: User | undefined;
  meals: Meal | undefined;
  date: Date | undefined;
  workouts: Workout | undefined;
  schedule: ScheduleItem | undefined;
  selected: any | undefined;
  list: any | undefined;
  [key: string]: any;
}

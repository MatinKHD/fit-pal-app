import { Meal } from './meal';
import { Workout } from './workout';

export interface ScheduleItem {
  meals: Meal[] | null;
  workouts: Workout[] | null;
  section: string;
  timeStamp: number;
  id?: string;
}

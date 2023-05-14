import { Pipe, PipeTransform } from "@angular/core";
import {Meal} from "../../../models/meal";
import {Workout} from "../../../models/workout";

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(value: any) {
    return Array.isArray(value) ? value.join(', ') : value;
  }
}


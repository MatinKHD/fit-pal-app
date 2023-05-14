import { Component, Input, ChangeDetectionStrategy, Output , EventEmitter } from "@angular/core";

import { Meal } from "../../../../models/meal";

@Component({
  selector: 'list-items',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./list-items.component.scss'],
  templateUrl: './list-items.component.html',
})
export class ListItemsComponent {

  test = ['test', 'test2']

  @Input()
  item!: any;

  toggled: boolean = false

  @Output()
  remove: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  getRoute(item: Meal) {
    return [
      `../${item.ingredients ? 'meals' : 'workouts'}`,
      item.id
    ]
  }

  onToggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }
}

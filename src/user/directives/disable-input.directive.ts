import { Directive, ElementRef, HostBinding } from "@angular/core";

@Directive({selector: 'input[disableInput]'})
export class DisableInputDirective {
  @HostBinding('disabled')
  disabled: boolean = true;
}

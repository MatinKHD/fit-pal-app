import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector: '[requiredError]'
})
export class ChecksForRequiredErrorDirective {
  @HostBinding('style.border')
  border!: string;


  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    let input = (event.target as HTMLInputElement).value;
    if(input === "" ) {
      this.border = '1px solid red';
    } else {
      this.border = `1px solid rgba(105, 105, 105, 0.15)`
    }
  }
}

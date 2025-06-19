import {Directive, effect, ElementRef, inject, input} from '@angular/core';

@Directive({
  selector: '[hasColor]',
})
export class HasColorDirective {
  private el = inject(ElementRef);

  color = input.required<string>();

  constructor() {
    effect(() => {
      this.el.nativeElement.style.backgroundColor = this.color();
      this.el.nativeElement.style.display = 'block';
    });
  }
}

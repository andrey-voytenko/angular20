import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
})
export class DynamicComponent {
  title = input.required<string>();
  description = input.required<string>();
  changed = output<string>();

  timer = input.required<number>();
  timerChange = output<number>();

  constructor() {
    setTimeout(() => {
      this.changed.emit('Dynamic Component changed');
    }, 2000);

    setInterval(() => {
      const newValue = this.timer() + 1;
      this.timerChange.emit(newValue);
    }, 1000);
  }
}

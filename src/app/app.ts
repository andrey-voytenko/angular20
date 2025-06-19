import {
  Component,
  createComponent,
  signal,
  inputBinding,
  outputBinding,
  ViewChild,
  ViewContainerRef, twoWayBinding, ElementRef
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgClass} from '@angular/common';
import {DynamicComponent} from './components/dynamic/dynamic.component';
import {HasColorDirective} from './directives/has-color.directive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // tsconfig: "typeCheckHostBindings": true,
  host: {
    '[class.active]': 'isActive',
    '(click)': 'toggle()',
  }
})
export class App {
  protected title = 'angular20';

  // Extended template expression syntax
  n = 2;
  person = {
    name: 'A',
  };
  colWidth = 2;

  //Host binding type check
  isActive = true;
  toggle() {
    this.isActive = !this.isActive;
  }

  //createComponent function
  @ViewChild('dynamic', { read: ViewContainerRef })
  vcr!: ViewContainerRef;
  outputValue = signal('');
  timer = signal(10);

  createDynamicComponent() {
    this.vcr.clear();
    this.vcr.createComponent(DynamicComponent, {
      bindings: [
        inputBinding('title', () => 'Dynamic component'),
        inputBinding('description', () => 'Dynamic component description'),
        outputBinding<string>('changed', (value) => this.outputValue.set(value)),
        twoWayBinding('timer', this.timer)
      ],
      directives: [
        {
          type: HasColorDirective,
          bindings: [inputBinding('color', () => 'blue')]
        }
      ]
    });
  }

  createDynamicComponentOld() {
    this.vcr.clear();
    const  cRef = this.vcr.createComponent(DynamicComponent);

    cRef.setInput('title', 'DC');
    cRef.setInput('description', 'DC description');
    cRef.setInput('timer', this.timer);

    cRef.instance.changed.subscribe((value) => {
      this.outputValue.set(value);
    });
  }

}

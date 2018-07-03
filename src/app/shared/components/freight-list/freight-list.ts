import { Component } from '@angular/core';

/**
 * Generated class for the FreightListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'freight-list',
  templateUrl: 'freight-list.html'
})
export class FreightListComponent {

  text: string;

  constructor() {
    console.log('Hello FreightListComponent Component');
    this.text = 'Hello World';
  }

}

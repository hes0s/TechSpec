import { Component, signal } from '@angular/core';
import { Body } from './body/body';
import { GeneralFooter } from '../shared/footer/footer';
import { GeneralHeader } from '../shared/header/header';

@Component({
  selector: 'home-page-app',
  imports: [ Body, GeneralFooter, GeneralHeader],
  template: `
    <app-general-header></app-general-header>
    
    <app-home-body></app-home-body>
    <app-general-footer></app-general-footer>

  `,
  styles: [],
})
export class HomePage {
  protected readonly title = signal('TechSpec');
}

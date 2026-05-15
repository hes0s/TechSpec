import { Component, signal } from '@angular/core';
import { Body } from './body/body';
import { GeneralFooter } from '../shared/footer/footer';
import { GeneralHeader } from '../shared/header/header';

@Component({
  selector: 'contacts-page-app',
  imports: [ Body, GeneralFooter, GeneralHeader],
  template: `
    <app-general-header></app-general-header>
    <app-contacts-body></app-contacts-body>
    <app-general-footer></app-general-footer>

  `,
  styles: [],
})
export class ContactPage {
  protected readonly title = signal('TechSpec');
}

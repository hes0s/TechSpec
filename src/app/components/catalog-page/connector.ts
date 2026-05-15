import { Component, signal } from '@angular/core';
import { Body } from './body/body';
import { GeneralFooter } from '../shared/footer/footer';
import { GeneralHeader } from '../shared/header/header';

@Component({
  selector: 'catalog-page-app',
  imports: [ Body, GeneralFooter, GeneralHeader],
  template: `
    <app-general-header></app-general-header>
    <app-catalog-body></app-catalog-body>
    <app-general-footer></app-general-footer>
  `,
  styles: [],
})
export class CatalogPage {
  protected readonly title = signal('TechSpec');
}

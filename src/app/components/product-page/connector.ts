import { Component, signal } from '@angular/core';
import { Body } from './body/body';
import { GeneralFooter } from '../shared/footer/footer';
import { GeneralHeader } from '../shared/header/header';

@Component({
  selector: 'product-page-app',
  imports: [ Body, GeneralFooter, GeneralHeader],
  template: `
    <app-general-header></app-general-header>
    <app-product-body></app-product-body>
    <app-general-footer></app-general-footer>

  `,
  styles: [],
})
export class ProductPage {
  protected readonly title = signal('TechSpec');
}

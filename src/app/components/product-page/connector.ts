import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Body } from './body/body';
import { Footer } from './footer/footer';
import { Header } from './header/header';

@Component({
  selector: 'product-page-app',
  imports: [RouterOutlet, Body, Footer, Header],
  template: `
    <app-header></app-header>
    <app-body></app-body>
    <app-footer></app-footer>
    <router-outlet />
  `,
  styles: [],
})
export class ProductPage {
  protected readonly title = signal('TechSpec');
}

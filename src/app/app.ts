import { HttpClient } from '@angular/common/http';
import { Component, NgModule, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('TechSpec');
}

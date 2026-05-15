import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme';
@Component({
  selector: 'app-body',
  imports: [],
  templateUrl: './body.html',
  styleUrl: './body.css'
})
export class Body {
  constructor(public theme: ThemeService) {}
}

// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private dark = false;

  constructor() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.dark = saved ? saved === 'dark' : prefersDark;
    this.apply();
  }

  toggle() {
    this.dark = !this.dark;
    localStorage.setItem('theme', this.dark ? 'dark' : 'light');
    this.apply();
  }

  isDark() {
    return this.dark;
  }

  private apply() {
    document.documentElement.setAttribute('data-theme', this.dark ? 'dark' : 'light');
  }
}
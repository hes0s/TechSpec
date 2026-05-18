import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../data/services/auth-service';
import { LocalStorageService } from '../../../data/services/local-storage-service';
import { ThemeService } from '../../../services/theme';

@Component({
  selector: 'app-general-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class GeneralHeader {
  constructor(public theme: ThemeService) {}
  private localS = inject(LocalStorageService);
  private auth = inject(AuthService);
  loggedIn: boolean = false;
  isAdmin: boolean = false;
  cartCount: number = 0;

  getCartStatus() {
    this.cartCount = this.localS.getItemCountCart();
  }

  watchCartUpdate() {
    this.localS.cart.subscribe((cart) => {
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }

  getStatus() {
    this.auth.getStatus().subscribe((user) => {
      if (user) {
        this.loggedIn = true;
        if (user != null && user.email == 'cusnircristi161@gmail.com' && user != null) {
          console.log('Admin access granted');
          this.isAdmin = true;
        } else {
          alert('You are not an admin');
        }
      } else {
        this.loggedIn = false;
      }
    });
  }

  logOut() {
    this.auth.logOut();
    alert('logged out');
  }

  ngOnInit() {
    this.getStatus();
    this.watchCartUpdate();
    this.getCartStatus();
  }
}

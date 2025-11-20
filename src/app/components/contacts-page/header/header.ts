import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../data/services/auth-service';
import { LocalStorageService } from '../../../data/services/local-storage-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private auth = inject(AuthService)
  private localS = inject(LocalStorageService)
  loggedIn : boolean = false
  cartCount: any;
  getStatus(){
    this.auth.getStatus().subscribe((user) => {
      if(user){
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    })
  }

  getCartStatus(){
    this.cartCount = this.localS.getItemCountCart() 
  }
  watchCartUpdate(){
    this.localS.cart.subscribe(cart => {
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0)
    })
  }

  logOut(){
    this.auth.logOut()
    alert("logged out")
  }

  ngOnInit() {
    this.getStatus()
    this.watchCartUpdate()
    this.getCartStatus()
  }
}

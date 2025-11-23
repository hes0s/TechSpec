import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../data/services/auth-service';
import { CartItem, LocalStorageService } from '../../../../data/services/local-storage-service';
import { ItemModel } from '../../../../data/models/ItemModel';

@Component({
  selector: 'app-body',
  imports: [],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  items: CartItem[] | undefined
  user: any
  productId: string = ''
  totalItem: number = 0;
  cartTotal: number = 0;
  private localS = inject(LocalStorageService)
  private auth = inject(AuthService)
  cartItemcount: any;
  
  
  getUserInfo(){
    this.user = this.auth.getCurent()
  }

  getCartinfo(){
    this.items = this.localS.getCart()
  }

  clearCart() {
    if(confirm('Are you sure you want to clear the cart?')) {
      this.localS.clearCart()
    }
  }

  addQuantity(productId: string){
    this.localS.increaseQuantity(productId)
  }

  reduceQuantity(productId: string){
    this.localS.decreaseQuantity(productId, 1)
  }
  removeItem(productId: string){
    this.localS.removeProduct(productId)
  }

  updateCart(){
    this.localS.cart.subscribe(cartItems => {
      this.items = cartItems;

      this.cartTotal = cartItems.reduce((sum, item) =>
      sum + (item.product.price*item.quantity), 0)

      this.cartItemcount = cartItems.reduce((sum, item) =>
      sum + item.quantity, 0
      )
      console.log("cart updated", cartItems)
    })
  }
  ngOnInit(){
    this.updateCart()
  }
}

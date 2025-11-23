import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../data/services/auth-service';
import { CartItem, LocalStorageService } from '../../../../data/services/local-storage-service';
import { ItemModel } from '../../../../data/models/ItemModel';
import { OrderModel } from '../../../../data/models/OrderModel';
import { DataService } from '../../../../data/services/data-service';

@Component({
  selector: 'app-body',
  imports: [FormsModule, CommonModule],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  items: CartItem[] | undefined
  userOrders: OrderModel[] = [];
  user: any
  productId: string = ''
  totalItem: number = 0;
  cartTotal: number = 0;
  loggedIn : boolean = false;
  cartItemcount: any;
  showCheckoutForm: boolean = false;
  private localS = inject(LocalStorageService);
  private dataService = inject(DataService);
  private auth = inject(AuthService);
  
  orderForm = {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    paymentMethod: 'card'
  };
Proceed: any;
  
  
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

  getStatus(){
    this.auth.getStatus().subscribe((user) => {
      if(user){
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }})
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

  proceedToCheckout() {
    if(this.items && this.items.length > 0) {
      this.showCheckoutForm = true;
    } else {
      alert('Your cart is empty!');
    }
  }
  submitOrder() {
  const order: OrderModel = {
    userId: this.auth.getCurent() || 'guest',
    items: this.items!,
    shippingAddress: {
      fullName: this.orderForm.fullName,
      address: this.orderForm.address,
      city: this.orderForm.city,
      postalCode: this.orderForm.postalCode,
      country: this.orderForm.country,
      phone: this.orderForm.phone
    },
    paymentMethod: this.orderForm.paymentMethod,
    total: this.cartTotal,
    status: 'PENDING',
    orderDate: new Date()
  };
    this.dataService.addOrder(order)
    .then(() => {
      alert('Order placed successfully!');
      this.localS.clearCart();
      this.showCheckoutForm = false;  
      this.resetForm();
      this.loadUserOrders();
    })
  }

  resetForm() {
  this.orderForm = {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    paymentMethod: 'card'
  };
}

loadUserOrders() {
  const userEmail = this.auth.getCurent();
  if(userEmail) {
    this.dataService.getUserOrders(userEmail).subscribe((orders: OrderModel[]) => {
      this.userOrders = orders;
    });
  }
}
  ngOnInit(){
    this.updateCart()
    this.getStatus()
  }
}

import { inject, Injectable } from '@angular/core';
import { DataService } from './data-service';
import { ItemModel } from '../models/ItemModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { NgModelGroup } from '@angular/forms';

export interface CartItem{
  product: ItemModel;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {
  product:ItemModel | undefined;
  private data = inject(DataService)
  private readonly CART_KEY = 'shopping_cart';
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart())

  public cart = this.cartSubject.asObservable()

  constructor() {
    this.cartSubject.next(this.loadCart());
  }

  loadCart(): CartItem[] {
    try{
      const cartData = localStorage.getItem(this.CART_KEY);

      if (cartData){
        return JSON.parse(cartData);
      }
      return []
    } catch(error){
      console.error('error while loading data from local storage');
      return [];
    }
  }

  private saveCart(cart: CartItem[]): void{
    try{
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
      this.cartSubject.next(cart);
    }catch(error){
      console.error('error while savin the product in cart')
    }
  }

 addProduct(product: ItemModel, quantity: number = 1): void {
  const cart = this.loadCart();
  
  const existingItemIndex = cart.findIndex(
    item => item.product.id === product.id
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
    console.log(`Increased quantity of ${product.name} to ${cart[existingItemIndex].quantity}`);
  } else {
    cart.push({ product, quantity });
    console.log(`Added ${product.name} to cart`);
  }
  this.saveCart(cart);
  }

  removeProduct(productId: string): void {
    const cart = this.loadCart();
    const updatedCart = cart.filter(item => item.product.id !== productId);
    this.saveCart(updatedCart);
  }

  updateQuantity(productId: string, quantity: number): void{
    const cart = this.loadCart();
    const itemIndex = cart.findIndex(item => item.product.id === productId);

    if(itemIndex !== -1){
      if(quantity <= 0){
        this.removeProduct(productId);
      }else{
        cart[itemIndex].quantity = quantity;
        this.saveCart(cart);
      }
    }
  }

  increaseQuantity(productId: string){
    const cart = this.loadCart();
    const item = cart.find(item => item.product.id === productId);

    if(item){
      this.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: string, quantity: number): void{
    const cart = this.loadCart()
    const item = cart.find(item => item.product.id === productId);
    if (item){
      if(item.quantity <= 1){
        this.removeProduct(productId);
      }else{ 
        this.updateQuantity(productId, item.quantity-1)
      }
    }
  }


  getCart(): CartItem[] {
    return this.loadCart()
  }

  getItemCountCart(): number{
    const cart = this.loadCart();
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  getTotalPrice(): number {
    const cart = this.loadCart();
    return cart.reduce(
      (total, item) => total + (item.product.price * item.quantity), 
      0
    );
  }

  isInCart(productId: string): boolean {
    const cart = this.loadCart();
    return cart.some(item => item.product.id === productId);
  }

  getProductQuantity(productId: string): number {
    const cart = this.loadCart();
    const item = cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }
  clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
    this.cartSubject.next([]);
  }
}

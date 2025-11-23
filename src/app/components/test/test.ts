import { Component, inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { DataService } from '../../data/services/data-service'
import { ItemModel } from '../../data/models/ItemModel';
import { Auth, authState, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { CartItem, LocalStorageService } from '../../data/services/local-storage-service';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test implements OnInit{
  ngOnInit(): void {
    this.getData()
  }
  private data = inject(DataService)
  private localS = inject(LocalStorageService)
  firestore = inject(Firestore);
  
  items : ItemModel[] = [];
  cartItems: CartItem[] = []

  getData(){
  this.data.getAlldata_products().subscribe({
    next: (res) => {
      this.items = res;
    },
    error: (err) => {
      console.log("error fetch data", err)
    }
  })
}
  getCurent(){
    const auth = getAuth();
    const user = auth.currentUser
    if(user){
      const userEmail = user.email
      console.log(typeof userEmail)
    }else{
      alert("You are not logged in")
    }
  }

  getCart(){
    this.cartItems = this.localS.getCart();
    console.log(this.cartItems);
  }
}

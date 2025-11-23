import { Firestore, collection, collectionData, addDoc, updateDoc, deleteDoc, setDoc, doc, query, where } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import { ItemModel } from '../models/ItemModel';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/OrderModel';


@Injectable({           
  providedIn: 'root'
})

export class DataService {
  private firestore = inject(Firestore); 
  
  getAlldata_products(){
  const productsRef = collection(this.firestore, 'products');
  return collectionData(productsRef, { idField: 'id' }) as Observable<ItemModel[]>; 
}
  addProduct(items: ItemModel){
    const productsRef = collection(this.firestore, 'products')

    return addDoc(productsRef, {
      name: items.name,
      description: items.description,
      imageUrl: items.imageUrl,
      price: items.price
    })
  }

  modifyProduct(id: string, items: Partial<ItemModel>){
    const productDoc = doc(this.firestore, 'products', id)
    return updateDoc(productDoc, {
      ...items
    })
  }

  deleteProduct(id: string){
    const productDoc = doc(this.firestore, 'product', id)
    return deleteDoc(productDoc)
  }

  
  addOrder(order: OrderModel): Promise<any> {
    const ordersRef = collection(this.firestore, 'orders');
    return addDoc(ordersRef, order);
  }
  getUserOrders(userEmail: string): Observable<OrderModel[]> {
    const ordersRef = collection(this.firestore, 'orders');
    const q = query(ordersRef, where('userId', '==', userEmail));
    return collectionData(q, { idField: 'id' }) as Observable<OrderModel[]>;
  }
}
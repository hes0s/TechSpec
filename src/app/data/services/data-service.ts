import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
  query,
  where,
} from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import { Category, ItemModel } from '../models/ItemModel';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/OrderModel';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private firestore = inject(Firestore);

  getAlldata_products() {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef, { idField: 'id' }) as Observable<ItemModel[]>;
  }
  addProduct(items: ItemModel) {
    const productsRef = collection(this.firestore, 'products');
    return addDoc(productsRef, {
      name: items.name,
      category: items.category,
      description: items.description,
      imageUrl: items.imageUrl,
      price: items.price,
      sections: items.sections,
    });
  }
  getAllOrders(): Observable<OrderModel[]> {
    const ref = collection(this.firestore, 'orders');
    return collectionData(ref, { idField: 'id' }) as Observable<OrderModel[]>;
  }

  updateOrderStatus(id: string, status: string): Promise<void> {
    const ref = doc(this.firestore, 'orders', id);
    return updateDoc(ref, { status });
  }

  modifyProduct(id: string, items: Partial<ItemModel>) {
    const productDoc = doc(this.firestore, 'products', id);
    return updateDoc(productDoc, {
      ...items,
    });
  }

  deleteProduct(id: string) {
    const productDoc = doc(this.firestore, 'products', id);
    return deleteDoc(productDoc);
  }

  addOrder(order: OrderModel): Promise<any> {
    const ordersRef = collection(this.firestore, 'orders');
    return addDoc(ordersRef, order);
  }
  deleteOrder(id: string) {
    const ordersRef = collection(this.firestore, 'orders');
    return deleteDoc(doc(this.firestore, 'orders', id));
  }
  getUserOrders(userEmail: string): Observable<OrderModel[]> {
    const ordersRef = collection(this.firestore, 'orders');
    const q = query(ordersRef, where('userId', '==', userEmail));
    return collectionData(q, { idField: 'id' }) as Observable<OrderModel[]>;
  }

  getCategories(): Observable<Category[]> {
    const ref = collection(this.firestore, 'categories');
    return collectionData(ref, { idField: 'id' }) as Observable<Category[]>;
  }

  addCategory(name: string): Promise<void> {
    const ref = collection(this.firestore, 'categories');
    return addDoc(ref, { name }).then(() => {});
  }

  deleteCategory(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'categories', id));
  }
}

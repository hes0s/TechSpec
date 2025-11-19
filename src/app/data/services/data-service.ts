import { Firestore, collection, collectionData, addDoc, updateDoc, deleteDoc, setDoc, doc } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import { ItemModel } from '../models/ItemModel';
import { Observable } from 'rxjs';


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
}
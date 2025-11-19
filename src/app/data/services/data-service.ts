import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import { ItemModel } from '../models/ItemModel';
import { Observable } from 'rxjs';


@Injectable({           
  providedIn: 'root'
})

export class DataService {
  private firestore = inject(Firestore); 
  items: ItemModel[] = [];
  data: any;
  
  getAlldata_products(){
  const productsRef = collection(this.firestore, 'products');
  return collectionData(productsRef, { idField: 'id' }) as Observable<ItemModel[]>; 
}}
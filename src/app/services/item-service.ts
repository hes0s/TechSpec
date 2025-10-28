import { Injectable } from '@angular/core';
import { ItemModel } from '../data/models/ItemModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) {}
  getItems(): Observable<any[]> {
    return this.http.get<any[]>('assets/ItemData.json');
  }
}

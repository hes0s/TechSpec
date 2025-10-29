import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) {}
  getItems(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/itemdata');
  }
}

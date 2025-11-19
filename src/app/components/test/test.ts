import { Component, inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { DataService } from '../../data/services/data-service'
import { ItemModel } from '../../data/models/ItemModel';

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
  firestore = inject(Firestore);
  
  items : ItemModel[] = [];

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
  
}

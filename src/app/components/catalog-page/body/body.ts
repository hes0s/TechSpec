import { Component, inject, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../data/services/data-service';
import { ItemModel } from '../../../data/models/ItemModel';

@Component({
  selector: 'app-body',
  imports: [CommonModule, RouterLink],
  templateUrl: './body.html',
  styleUrl: './body.css'
})
export class Body {
  items: ItemModel[] = [];

  private data = inject(DataService);

  ngOnInit() {
    this.getData();
  }
  getData(){
    this.data.getAlldata_products().subscribe({
      next: (res: any) => {
        this.items = res;
      },
      error: (err: any) => {
        console.log("error fetch data", err)
      }
    })
  }

}

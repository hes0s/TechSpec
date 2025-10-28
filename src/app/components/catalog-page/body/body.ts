import { Component, inject, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item-service';
import { ItemModel } from '../../../data/models/ItemModel';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-body',
  imports: [CommonModule],
  templateUrl: './body.html',
  styleUrl: './body.css'
})
export class Body {
  items: any[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe(data => {
      this.items = data;
    });
  }
}

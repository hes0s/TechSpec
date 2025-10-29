import { Component, inject, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item-service';
import { ItemModel } from '../../../data/models/ItemModel';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-body',
  imports: [CommonModule, RouterLink],
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

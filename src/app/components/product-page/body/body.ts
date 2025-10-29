import { Component, inject, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  product:ItemModel | undefined;

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private items = inject(ItemService) 
  
   ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.items.getItems().subscribe(items => {
      this.product = items.find(item => item.id === id);
    });
  }
  goBack() {
    this.router.navigate(['/']); 
  }
}

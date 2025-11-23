import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemModel } from '../../../data/models/ItemModel';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../data/services/data-service';

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
  private items = inject(DataService) 
  
   ngOnInit() {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.items.getAlldata_products().subscribe(items => {
      this.product = items.find(item => item.id === id);
    });
  }
  goBack() { 
    this.router.navigate(['/catalog']); 
  }
}

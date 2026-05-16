import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemModel } from '../../../data/models/ItemModel';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../data/services/data-service';
import { LocalStorageService } from '../../../data/services/local-storage-service';
import { AuthService } from '../../../data/services/auth-service';

@Component({
  selector: 'app-product-body',
  imports: [CommonModule],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  product: ItemModel | undefined;
  islogged: boolean = false;
  private localS = inject(LocalStorageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private data = inject(DataService);
  private auth = inject(AuthService);

  ngOnInit() {
    this.getStatus();
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.data.getAlldata_products().subscribe((items) => {
      this.product = items.find((item) => item.id === id);
    });
  }

  getStatus() {
    this.auth.getStatus().subscribe((user) => {
      this.islogged = !!user;
    });
  }

  goBack() {
    this.router.navigate(['/catalog']);
  }
  addToCart() {
    if (!this.product) return;
    if (!this.islogged) {
      this.router.navigate(['/login']);
      return;
    }
    this.localS.addProduct(this.product);
  }
}

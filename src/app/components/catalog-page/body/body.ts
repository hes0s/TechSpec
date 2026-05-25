import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../data/services/data-service';
import { AuthService } from '../../../data/services/auth-service';
import { LocalStorageService } from '../../../data/services/local-storage-service';
import { ItemModel } from '../../../data/models/ItemModel';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../data/models/ItemModel';

@Component({
  selector: 'app-catalog-body',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  items: ItemModel[] = [];
  private auth = inject(AuthService);
  private data = inject(DataService);
  private localS = inject(LocalStorageService);
  private router = inject(Router);
  categories: Category[] = [];
  selectedCategory: string = '';
  searchQuery: string = '';
  sortOption: string = '';
  minPrice: number = 0;
  maxPrice: number = 9999;
  islogged: boolean = false;

  ngOnInit() {
    this.getStatus();
    this.getData();
    this.data.getCategories().subscribe((c) => (this.categories = c));
  }
  goToLogin(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/login']);
  }

  add_Produt_to_Cart(event: Event, item: ItemModel) {
    event.preventDefault();
    event.stopPropagation();
    this.localS.addProduct(item);
  }

  getStatus() {
    this.auth.getStatus().subscribe((user) => {
      if (user) {
        this.islogged = true;
      } else {
        this.islogged = false;
      }
    });
  }

  getData() {
    this.data.getAlldata_products().subscribe({
      next: (res: any) => {
        this.items = res;
      },
      error: (err: any) => {
        console.log('error fetch data', err);
      },
    });
  }

  get filteredItems(): ItemModel[] {
    let result = this.items;

    // Căutare
    if (this.searchQuery.trim()) {
      result = result.filter((i) => i.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

    // Categorie
    if (this.selectedCategory) {
      result = result.filter((i) => i.category === this.selectedCategory);
    }

    // Preț
    result = result.filter((i) => i.price >= this.minPrice && i.price <= this.maxPrice);

    // Sortare
    if (this.sortOption === 'price_asc') result = [...result].sort((a, b) => a.price - b.price);
    if (this.sortOption === 'price_desc') result = [...result].sort((a, b) => b.price - a.price);
    if (this.sortOption === 'name_asc')
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }

  resetFilters() {
    this.selectedCategory = '';
    this.searchQuery = '';
    this.sortOption = '';
    this.minPrice = 0;
    this.maxPrice = 9999;
  }
}

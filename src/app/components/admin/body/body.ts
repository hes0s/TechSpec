import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../../data/services/data-service';
import { Category, ItemModel } from '../../../data/models/ItemModel';
import { ItemSpec } from '../../../data/models/ItemModel';
import { ItemSection } from '../../../data/models/ItemModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../data/services/auth-service';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin-body',
  imports: [FormsModule, CommonModule],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  private auth = inject(AuthService);
  private dataService = inject(DataService);

  newCategoryName: string = '';
  isEditing: boolean = false;
  islogged: boolean = false;

  categories: Category[] = [];
  products: ItemModel[] = [];
  productForm: ItemModel = {
    id: '',
    name: '',
    category: '',
    description: '',
    price: 0,
    imageUrl: '',
    sections: [],
  };

  ngOnInit() {
    this.getUser();
    this.loadProducts();
    this.loadCategories();
  }

  // Sections - Specs Create Remove
  addSection() {
    this.productForm.sections.push({ name: '', specs: [] });
  }
  removeSection(si: number) {
    this.productForm.sections.splice(si, 1);
  }
  addSpec(si: number) {
    this.productForm.sections[si].specs.push({ key: '', value: '' });
  }
  removeSpec(si: number, ki: number) {
    this.productForm.sections[si].specs.splice(ki, 1);
  }

  // Categories section
  loadCategories() {
    this.dataService.getCategories().subscribe((c) => (this.categories = c));
  }
  addCategory() {
    if (!this.newCategoryName.trim()) return;
    this.dataService.addCategory(this.newCategoryName).then(() => (this.newCategoryName = ''));
  }
  deleteCategory(id: string) {
    this.dataService.deleteCategory(id);
  }

  //Product CRUD
  addProduct() {
    this.dataService
      .addProduct(this.productForm)
      .then(() => {
        alert('Produs adăugat cu succes!');
        this.resetForm();
      })
      .catch((error) => {
        alert('Eroare: ' + error.message);
      });
  }
  editProduct(product: ItemModel) {
    this.isEditing = true;
    this.productForm = { ...product };
  }
  updateProduct() {
    const { id, ...productData } = this.productForm;

    this.dataService
      .modifyProduct(id, productData)
      .then(() => {
        this.resetForm();
      })
      .catch((error) => {
        alert('Eroare: ' + error.message);
      });
  }
  deleteProduct(id: string) {
    if (confirm('Sigur vrei să ștergi acest produs?')) {
      this.dataService
        .deleteProduct(id)
        .then(() => {})
        .catch((error) => {
          alert('Eroare: ' + error.message);
        });
    }
  }
  resetForm() {
    this.productForm = {
      id: '',
      name: '',
      category: '',
      description: '',
      price: 0,
      imageUrl: '',
      sections: [],
    };
    this.isEditing = false;
  }
  saveProduct() {
    if (this.isEditing) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }
  loadProducts() {
    this.dataService.getAlldata_products().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Eroare la încărcare:', err);
      },
    });
  }

  //User Info
  getUser() {
    this.auth.getStatus().subscribe((user) => {
      if (user !== null && user.email === 'cusnircristi161@gmail.com') {
        this.islogged = true;
        console.log('Admin access granted');
      } else {
        this.islogged = false;
        if (user === null) {
          alert('You are not logged in');
        } else {
          alert('You are not an admin');
        }
      }
    });
  }
}

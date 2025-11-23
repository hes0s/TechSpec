import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../../data/services/data-service';
import { ItemModel } from '../../../data/models/ItemModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../data/services/auth-service';
import { getAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-body',
  imports: [FormsModule, CommonModule],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
private auth = inject(AuthService);
islogged: boolean = false;
private dataService = inject(DataService);
  
  products: ItemModel[] = [];
  
  productForm: ItemModel = {
    id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: ''
  };
  
  isEditing: boolean = false;

  ngOnInit() {
    this.getUser();
    this.loadProducts();
  }

  loadProducts() {
    this.dataService.getAlldata_products().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Eroare la încărcare:', err);
      }
    });
  }

  addProduct() {
    this.dataService.addProduct(this.productForm)
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
    
    this.dataService.modifyProduct(id, productData)
      .then(() => {
        alert('Produs actualizat!');
        this.resetForm();
      })
      .catch((error) => {
        alert('Eroare: ' + error.message);
      });
  }

  deleteProduct(id: string) {
    if (confirm('Sigur vrei să ștergi acest produs?')) {
      this.dataService.deleteProduct(id)
        .then(() => {
          alert('Produs șters!');
        })
        .catch((error) => {
          alert('Eroare: ' + error.message);
        });
    }
  }

  resetForm() {
    this.productForm = {
      id: '',
      name: '',
      description: '',
      price: 0,
      imageUrl: ''
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

  getUser(){
    this.auth.getStatus().subscribe(user => {
      if(user !== null && user.email === 'admin@admin.com'){
        this.islogged = true
        console.log('Admin access granted')
      } else {
        this.islogged = false
        if(user === null){
          alert("You are not logged in")
        } else {
          alert("You are not an admin")
        }
    }
  })
}
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../data/services/data-service';
import { AuthService } from '../../../data/services/auth-service';
import { LocalStorageService } from '../../../data/services/local-storage-service';
import { ItemModel } from '../../../data/models/ItemModel';
import { loadBundle } from '@angular/fire/firestore';

@Component({
  selector: 'app-body',
  imports: [CommonModule, RouterLink],
  templateUrl: './body.html',
  styleUrl: './body.css'
})
export class Body {
  items: ItemModel[] = [];
  private auth = inject(AuthService);
  private data = inject(DataService);
  private localS = inject(LocalStorageService)
  private router = inject(Router);
  
  islogged: boolean = false

  ngOnInit() {
    this.getStatus()
    this.getData();
  }
  goToLogin(event: Event){
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/login'])
  }

  add_Produt_to_Cart(event: Event, item: ItemModel) { 
    event.preventDefault();
    event.stopPropagation();
  
    this.localS.addProduct(item);  
  }

  getStatus(){
    this.auth.getStatus().subscribe((user) =>{
      if(user){
        this.islogged = true;
      }else{
        this.islogged = false;
      }
    })
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

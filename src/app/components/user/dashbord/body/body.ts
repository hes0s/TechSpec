import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../data/services/auth-service';
import { CartItem, LocalStorageService } from '../../../../data/services/local-storage-service';
import { ItemModel } from '../../../../data/models/ItemModel';

@Component({
  selector: 'app-body',
  imports: [],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {
  items: CartItem[] | undefined
  totalItem: number = 0;
  
  private localS = inject(LocalStorageService)
  
  getCartinfo(){
    this.items = this.localS.getCart()

  }
}

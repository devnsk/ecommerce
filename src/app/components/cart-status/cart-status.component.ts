import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor(private cartService: CartService) {
  }
  ngOnInit() {
    this.updateCartStatus();
  }
  updateCartStatus() {
    //subscribe to totalPRice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
  );
    //subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
  );
  }

}


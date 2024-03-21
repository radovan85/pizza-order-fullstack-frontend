import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private router = inject(Router);
  private targetUrl = `http://localhost:8080/api/cart/`;

  redirectCartItemForm(pizzaId: any) {
    this.router.navigate([`cart/addPizza/${pizzaId}`]);
  }

  redirectItemAdded() {
    this.router.navigate([`cart/itemAdded`]);
  }

  redirectCart() {
    this.router.navigate([`cart`]);
  }

  getMyCart() {
    return axios.get(`${this.targetUrl}getMyCart`);
  }

  async eraseItem(itemId: any) {
    return await axios.delete(`${this.targetUrl}removeCartItem/${itemId}`);
  }

  async eraseAllItems() {
    return await axios.delete(`${this.targetUrl}clearCart`);
  }

  redirectInvalidCart() {
    this.router.navigate([`cart/invalidCart`]);
  }

  getTargetUrl() {
    return this.targetUrl;
  }
}

import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private router = inject(Router);
  private targetUrl = `http://localhost:8080/api/order/`;
  private adminTargetUrl = `http://localhost:8080/api/admin/`;

  constructor() { }

  redirectCancelOrder() {
    this.router.navigate([`order/canceled`]);
  }

  redirectAddressConfirm() {
    this.router.navigate([`order/addressConfirmation`]);
  }

  redirectPhoneConfirmation() {
    this.router.navigate([`order/phoneConfirmation`]);
  }

  checkout() {
    return axios.get(`${this.targetUrl}checkout`);
  }

  redirectOrderConfirmation() {
    this.router.navigate([`order/orderConfirmation`]);
  }

  async executeOrder() {
    return await axios.post(`${this.targetUrl}createOrder`);
  }

  redirectOrderCompleted() {
    this.router.navigate([`order/orderCompleted`]);
  }

  collectAllOrders() {
    return axios.get(`${this.adminTargetUrl}allOrders`);
  }

  redirectAllOrders() {
    this.router.navigate([`order/allOrders`]);
  }

  redirectOrderDetails(orderId: any) {
    this.router.navigate([`order/orderDetails/${orderId}`]);
  }

  collectAllItems(orderId: any) {
    return axios.get(`${this.adminTargetUrl}allItems/${orderId}`);
  }

  getOrderDetails(orderId: any) {
    return axios.get(`${this.adminTargetUrl}orderDetails/${orderId}`);
  }

  getAddressDetails(orderId: any) {
    return axios.get(`${this.adminTargetUrl}orderAddress/${orderId}`);
  }

  async deleteOrder(orderId: any) {
    return await axios.delete(`${this.adminTargetUrl}deleteOrder/${orderId}`);
  }
}

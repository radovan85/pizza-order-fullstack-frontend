import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor() { }

  private router = inject(Router);
  private targetUrl = `http://localhost:8080/api/pizza/`;
  private adminUrl = `http://localhost:8080/api/admin/`;

  redirectAllPizzas() {
    this.router.navigate([`pizzas`]);
  }

  redirectAllSizes() {
    this.router.navigate([`pizzaSizes`]);
  }

  redirectAllSizesByPizza(pizzaId: any) {
    this.router.navigate([`pizzaSizes/${pizzaId}`]);
  }

  redirectAddPizza() {
    this.router.navigate([`pizzas/addPizza`]);
  }

  redirectPizzaDetails(pizzaId: any) {
    this.router.navigate([`pizzas/pizzaDetails/${pizzaId}`]);
  }

  redirectUpdatePizza(pizzaId: any) {
    this.router.navigate([`pizzas/updatePizza/${pizzaId}`]);
  }

  redirectPizzaSizeDetails(pizzaSizeId: any) {
    this.router.navigate([`pizzaSizes/pizzaSizeDetails/${pizzaSizeId}`]);
  }

  redirectAddPizzaSize() {
    this.router.navigate([`pizzaSizes/addPizzaSize`]);
  }

  redirectUpdatePizzaSize(pizzaSizeId: any) {
    this.router.navigate([`pizzaSizes/updatePizzaSize/${pizzaSizeId}`]);
  }

  redirectPizzaSizeError() {
    this.router.navigate([`pizzaSizes/error`]);
  }

  collectAllPizzas() {
    return axios.get(`${this.targetUrl}allPizzas`);
  }

  collectAllSizes() {
    return axios.get(`${this.targetUrl}allPizzaSizes`);
  }

  collectAllSizesByPizza(pizzaId: any) {
    return axios.get(`${this.targetUrl}allPizzaSizes/${pizzaId}`);
  }

  getPizzaDetails(pizzaId: any) {
    return axios.get(`${this.targetUrl}pizzaDetails/${pizzaId}`);
  }

  async deletePizza(pizzaId: any) {
    return await axios.delete(`${this.adminUrl}deletePizza/${pizzaId}`);
  }

  getPizzaSizeDetails(pizzaSizeId: any) {
    return axios.get(`${this.targetUrl}pizzaSizeDetails/${pizzaSizeId}`);
  }

  async deletePizzaSize(pizzaSizeId: any) {
    return await axios.delete(`${this.adminUrl}deletePizzaSize/${pizzaSizeId}`);
  }

  getAdminUrl() {
    return this.adminUrl;
  }

  getTargetUrl() {
    return this.targetUrl;
  }


}

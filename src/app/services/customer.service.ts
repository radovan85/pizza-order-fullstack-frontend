import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  private router = inject(Router);
  private adminTargetUrl = `http://localhost:8080/api/admin/`;
  private targetUrl = `http://localhost:8080/api/customers/`;

  redirectAllCustomers() {
    this.router.navigate([`customers`]);
  }

  collectAllCustomers() {
    return axios.get(`${this.adminTargetUrl}allCustomers`);
  }

  getCurrentCustomer() {
    return axios.get(`${this.targetUrl}currentCustomer`);
  }

  getMyAddress() {
    return axios.get(`${this.targetUrl}getMyAddress`);
  }

  async deleteCustomer(customerId: any) {
    return await axios.delete(`${this.adminTargetUrl}deleteCustomer/${customerId}`);
  }

  getCustomerDetails(customerId: any) {
    return axios.get(`${this.adminTargetUrl}customerDetails/${customerId}`);
  }

  redirectCustomerDetails(customerId: any) {
    this.router.navigate([`customers/customerDetails/${customerId}`]);
  }

  getTargetUrl(): string {
    return this.targetUrl;
  }

}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Customer } from '../../../classes/customer';
import { Order } from '../../../classes/order';
import { User } from '../../../classes/user';
import { CustomerService } from '../../../services/customer.service';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {


  private allOrders: Order[] = [];
  private allCustomers: Customer[] = [];
  private allUsers: User[] = [];
  private orderService = inject(OrderService);
  private customerService = inject(CustomerService);
  private userService = inject(UserService);
  private paginatedOrders: Order[] = [];
  private pageSize = 15;
  private currentPage = 1;
  private totalPages = 1;

  ngOnInit(): void {
    Promise.all([
      this.listAllOrders(),
      this.listAllUsers(),
      this.listAllCustomers()
    ])
  }

  deleteOrder(orderId: any) {
    if (confirm(`Remove this order?`)) {
      this.orderService.deleteOrder(orderId)
        .then(() => {
          this.listAllOrders();
          this.orderService.redirectAllOrders();
        })

        .catch(() => {
          alert(`Failed!`);
        })
    }
  }

  redirectOrderDetails(orderId: any) {
    this.orderService.redirectOrderDetails(orderId);
  }

  listAllOrders(): Promise<any> {
    return new Promise(() => {
      this.orderService.collectAllOrders()
        .then((response) => {
          setTimeout(() => {
            this.allOrders = response.data;
            this.totalPages = Math.ceil(this.allOrders.length / this.pageSize);
            this.setPage(1);
          })
        })
    })
  }


  listAllCustomers(): Promise<any> {
    return new Promise(() => {
      this.customerService.collectAllCustomers()
        .then((response) => {
          setTimeout(() => {
            this.allCustomers = response.data;
          })
        })
    })
  }

  listAllUsers(): Promise<any> {
    return new Promise(() => {
      this.userService.collectAllUsers()
        .then((response) => {
          setTimeout(() => {
            this.allUsers = response.data;
          })
        })
    })
  }

  getAllUsers(): User[] {
    return this.allUsers;
  }

  getAllCustomers(): Customer[] {
    return this.allCustomers;
  }

  getAllOrders(): Order[] {
    return this.allOrders;
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.paginatedOrders = this.allOrders.slice((page - 1) * this.pageSize, page * this.pageSize);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }

  prevPage() {
    this.setPage(this.currentPage - 1);
  }

  getPageSize() {
    return this.pageSize;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getTotalPages() {
    return this.totalPages;
  }

  getPaginatedOrders(): Order[] {
    return this.paginatedOrders;
  }
}

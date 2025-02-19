import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Customer } from '../../../classes/customer';
import { User } from '../../../classes/user';
import { CustomerService } from '../../../services/customer.service';
import { UserService } from '../../../services/user.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {

  private customerList: Customer[] = [];
  private userList: User[] = [];
  private customerService = inject(CustomerService);
  private userService = inject(UserService);
  private paginatedCustomers: Customer[] = [];
  private pageSize = 10;
  private currentPage = 1;
  private totalPages = 1;

  ngOnInit(): void {
    this.loadData();
  }

  deleteCustomer(customerId: any) {
    if (confirm(`Remove this customer?\nIt will affect all related data?`)) {
      this.customerService.deleteCustomer(customerId)
        .then(() => {
          this.loadData();
          this.customerService.redirectAllCustomers();
        })

        .catch(() => {
          alert(`Failed!`);
        })
    }
  }

  reactivateUser(userId: any) {
    if (confirm(`Are you certain that you want to reactivate this user?`)) {
      this.userService.reactivateUser(userId)
        .then(() => {
          this.loadData();
          this.customerService.redirectAllCustomers();
        })

        .catch(() => {
          alert(`Failed`);
        })
    }
  }

  suspendUser(userId: any) {
    if (confirm(`Are you certain that you want to suspend this user?`)) {
      this.userService.suspendUser(userId)
        .then(() => {
          this.loadData();
          this.customerService.redirectAllCustomers();
        })

        .catch(() => {
          alert(`Failed!`);
        })
    }
  }

  redirectCustomerDetails(customerId: any) {
    this.customerService.redirectCustomerDetails(customerId);
  }

  listAllUsers(): Promise<any> {
    return new Promise(() => {
      this.userService.collectAllUsers()
        .then((response) => {
          setTimeout(() => this.userList = response.data);
        })
    })

  }


  listAllCustomers(): Promise<any> {
    return new Promise(() => {
      this.customerService.collectAllCustomers()
        .then((response) => {
          setTimeout(() => {
            this.customerList = response.data;
            this.totalPages = Math.ceil(this.customerList.length / this.pageSize);
            this.setPage(1);
          });
        })
    })
  }

  loadData() {
    Promise.all([this.listAllUsers(), this.listAllCustomers()])
      .then(() => {

      })
      .catch((error) => {
        console.error('Error loading functions', error);
      });
  }

  getUser(userId: any): User {
    var returnValue = new User;
    this.userList.forEach((user) => {
      if (user.id === userId) {
        returnValue = user;
      }
    })

    return returnValue;
  }

  getCustomerList(): Customer[] {
    return this.customerList;
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.paginatedCustomers = this.customerList.slice((page - 1) * this.pageSize, page * this.pageSize);
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

  getPaginatedCustomers(): Customer[] {
    return this.paginatedCustomers;
  }


}

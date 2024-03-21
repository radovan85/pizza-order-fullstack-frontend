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
          setTimeout(() => this.customerList = response.data);
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


}

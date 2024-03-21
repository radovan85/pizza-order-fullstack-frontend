import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../../classes/customer';
import { User } from '../../../classes/user';
import { CustomerService } from '../../../services/customer.service';
import { UserService } from '../../../services/user.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent implements OnInit {

  private customer: Customer = new Customer;
  private allUsers: User[] = [];
  private userService = inject(UserService);
  private customerService = inject(CustomerService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    Promise.all([
      this.listAllUsers(),
      this.getCustomerDetails(this.route.snapshot.params[`customerId`]),
    ])

      .catch(() => {
        console.log(`An issue occured while loading functions!`);
      })
  }

  redirectAllCustomers() {
    this.customerService.redirectAllCustomers();
  }

  reactivateUser(userId: any) {
    if (confirm(`Reactivate this user?`)) {
      this.userService.reactivateUser(userId)
        .then(() => {
          this.redirectAllCustomers();
        })

        .catch(() => {
          alert(`Failed!`);
        })
    }
  }

  suspendUser(userId: any) {
    if (confirm(`Suspend this user?`)) {
      this.userService.suspendUser(userId)
        .then(() => {
          this.redirectAllCustomers();
        })

        .catch(() => {
          alert(`Failed!`);
        })
    }
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

  getCustomerDetails(customerId: any): Promise<any> {
    return new Promise(() => {
      this.customerService.getCustomerDetails(customerId)
        .then((response) => {
          this.customer = response.data;
        })
    })
  }

  getUser(userId: any): User {
    var returnValue: User = new User;
    this.allUsers.forEach((user) => {
      if (user.id === userId) {
        returnValue = user;
      }
    })

    return returnValue;
  }

  getCustomer() {
    return this.customer;
  }

}

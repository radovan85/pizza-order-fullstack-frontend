import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { User } from '../../classes/user';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';
import { PizzaService } from '../../services/pizza.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  private authUser: User = new User;
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private pizzaService = inject(PizzaService);
  private customerService = inject(CustomerService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  redirectAllSizes() {
    this.pizzaService.redirectAllSizes();
  }

  redirectAllOrders() {
    this.orderService.redirectAllOrders();
  }

  redirectAllPizzas() {
    this.pizzaService.redirectAllPizzas();
  }

  redirectAllCustomers() {
    this.customerService.redirectAllCustomers();
  }

  redirectCart() {
    this.cartService.redirectCart();
  }

  redirectLogout() {
    this.authService.logout();
  }

  redirectHome() {
    this.router.navigate([`home`]);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  hasAuthorityAdmin(): boolean {
    return this.authService.isAdmin();
  }

  hasAuthorityUser(): boolean {
    return this.authService.isUser();
  }

  getAuthUser(): User {
    return this.authUser;
  }

  loadCurrentUser(): Promise<any> {
    return new Promise(() => {
      if (this.isAuthenticated()) {
        this.userService.getCurrentUser()
          .then((response) => {
            setTimeout(() => {
              this.authUser = response.data;
            })
          })
      }
    })
  }

}

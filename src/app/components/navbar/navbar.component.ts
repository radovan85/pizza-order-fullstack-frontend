import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { User } from '../../classes/user';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';
import { PizzaService } from '../../services/pizza.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  private authUser: User = new User;
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private pizzaService = inject(PizzaService);
  private customerService = inject(CustomerService);
  private cartService = inject(CartService);
  private router = inject(Router);

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

}

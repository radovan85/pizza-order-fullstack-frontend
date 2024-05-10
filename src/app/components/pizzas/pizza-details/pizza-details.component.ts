import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pizza } from '../../../classes/pizza';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { PizzaService } from '../../../services/pizza.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-pizza-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './pizza-details.component.html',
  styleUrl: './pizza-details.component.css'
})
export class PizzaDetailsComponent implements OnInit {


  private tempPizza: Pizza = new Pizza;
  private route = inject(ActivatedRoute);
  private pizzaService = inject(PizzaService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.getPizzaDetails(this.route.snapshot.params[`pizzaId`]);
  }

  redirectAllPizzas() {
    this.pizzaService.redirectAllPizzas();
  }

  deletePizza(pizzaId: any) {
    if (confirm(`Remove this pizza?\nIt will affect all related data!`)) {
      this.pizzaService.deletePizza(pizzaId)
        .then(() => {
          this.pizzaService.redirectAllPizzas();
        })
        .catch(() => {
          alert(`Failed!`);
        })
    }
  }

  redirectUpdatePizza(pizzaId: any) {
    this.pizzaService.redirectUpdatePizza(pizzaId);
  }

  redirectAllSizesByPizza(pizzaId: any) {
    this.pizzaService.redirectAllSizesByPizza(pizzaId);
  }

  getPizzaDetails(pizzaId: any) {
    this.pizzaService.getPizzaDetails(pizzaId)
      .then((response) => {
        this.tempPizza = response.data;
      })
  }

  redirectAddPizzaToCart(pizzaId: any) {
    this.cartService.redirectCartItemForm(pizzaId);
  }

  hasAuthorityAdmin(): boolean {
    return this.authService.isAdmin();
  }

  hasAuthorityUser() {
    return this.authService.isUser();
  }

  getTempPizza(): Pizza {
    return this.tempPizza;
  }

}

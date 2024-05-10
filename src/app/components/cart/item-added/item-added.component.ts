import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PizzaService } from '../../../services/pizza.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-item-added',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './item-added.component.html',
  styleUrl: './item-added.component.css'
})
export class ItemAddedComponent {

  private pizzaService = inject(PizzaService);
  private cartService = inject(CartService);

  redirectAllPizzas() {
    this.pizzaService.redirectAllPizzas();
  }

  redirectCart() {
    this.cartService.redirectCart();
  }
}

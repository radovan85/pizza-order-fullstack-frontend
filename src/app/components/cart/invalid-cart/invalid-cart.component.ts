import { Component, inject } from '@angular/core';
import { PizzaService } from '../../../services/pizza.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-invalid-cart',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './invalid-cart.component.html',
  styleUrl: './invalid-cart.component.css'
})
export class InvalidCartComponent {

  private pizzaService = inject(PizzaService);

  redirectAllPizzas() {
    this.pizzaService.redirectAllPizzas();
  }

}

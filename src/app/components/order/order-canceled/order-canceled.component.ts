import { Component, inject } from '@angular/core';
import { PizzaService } from '../../../services/pizza.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-order-canceled',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './order-canceled.component.html',
  styleUrl: './order-canceled.component.css'
})
export class OrderCanceledComponent {

  private pizzaService = inject(PizzaService);

  redirectAllPizzas() {
    this.pizzaService.redirectAllPizzas();
  }

}

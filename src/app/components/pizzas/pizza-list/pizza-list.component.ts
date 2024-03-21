import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Pizza } from '../../../classes/pizza';
import { AuthService } from '../../../services/auth.service';
import { PizzaService } from '../../../services/pizza.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-pizza-list',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './pizza-list.component.html',
  styleUrl: './pizza-list.component.css'
})
export class PizzaListComponent implements OnInit {

  constructor() { }

  private pizzaList: Pizza[] = [];
  private pizzaService = inject(PizzaService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    Promise.all([
      this.listAllPizzas(),
    ])
  }

  deletePizza(pizzaId: any) {
    if (confirm(`Remove this pizza?\nIt will affect all related data!`)) {
      this.pizzaService.deletePizza(pizzaId)
        .then(() => {
          this.listAllPizzas();
          this.pizzaService.redirectAllPizzas();
        })
        .catch(() => {
          alert(`Failed!`);
        })
    }
  }
  redirectAllSizesByPizza(pizzaId: any) {
    this.pizzaService.redirectAllSizesByPizza(pizzaId);
  }
  redirectPizzaDetails(pizzaId: any) {
    this.pizzaService.redirectPizzaDetails(pizzaId);
  }
  redirectUpdatePizza(pizzaId: any) {
    this.pizzaService.redirectUpdatePizza(pizzaId);
  }
  redirectAddPizza() {
    this.pizzaService.redirectAddPizza();
  }

  listAllPizzas(): Promise<any> {
    return new Promise(() => {
      this.pizzaService.collectAllPizzas()
        .then((response) => {
          setTimeout(() => this.pizzaList = response.data);
        })
    })
  }

  getPizzaList(): Pizza[] {
    return this.pizzaList;
  }

  getHasAuthorityAdmin() {
    return this.authService.isAdmin();
  }

  getHasAuthorityUser() {
    return this.authService.isUser();
  }


}

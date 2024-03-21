import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Pizza } from '../../../classes/pizza';
import { PizzaSize } from '../../../classes/pizza-size';
import { AuthService } from '../../../services/auth.service';
import { PizzaService } from '../../../services/pizza.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-pizza-size-list',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './pizza-size-list.component.html',
  styleUrl: './pizza-size-list.component.css'
})
export class PizzaSizeListComponent implements OnInit {


  private pizzaSizeList: PizzaSize[] = [];
  private pizzaList: Pizza[] = [];
  private pizzaService = inject(PizzaService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    Promise.all([
      this.listAllPizzas(),
      this.listAllPizzaSizes(),
    ])

      .catch((error) => {
        console.error(`Error loading functions  ${error}`);
      });
  }

  deletePizzaSize(pizzaSizeId: any) {
    if (confirm(`Remove this size?`)) {
      this.pizzaService.deletePizzaSize(pizzaSizeId)
        .then(() => {
          this.listAllPizzaSizes();
          this.pizzaService.redirectAllSizes();
        })

        .catch(() => {
          alert(`Failed!`);
        })
    }
  }

  redirectPizzaSizeDetails(pizzaSizeId: any) {
    this.pizzaService.redirectPizzaSizeDetails(pizzaSizeId);
  }

  redirectAddPizzaSize() {
    this.pizzaService.redirectAddPizzaSize();
  }

  redirectUpdatePizzaSize(pizzaSizeId: any) {
    this.pizzaService.redirectUpdatePizzaSize(pizzaSizeId);
  }

  redirectAllPizzas() {
    this.pizzaService.redirectAllPizzas();
  }

  listAllPizzas(): Promise<any> {
    return new Promise(() => {
      this.pizzaService.collectAllPizzas()
        .then((response) => {
          setTimeout(() => this.pizzaList = response.data);
        })
    })
  }

  listAllPizzaSizes(): Promise<any> {
    return new Promise(() => {
      this.pizzaService.collectAllSizes()
        .then((response) => {
          setTimeout(() => {
            this.pizzaSizeList = response.data;
          });
        })
    })
  }

  getPizzaSizeList() {
    return this.pizzaSizeList;
  }

  hasAuthorityAdmin() {
    return this.authService.isAdmin();
  }

  getPizza(pizzaId: any): Pizza {
    var returnValue: Pizza = new Pizza;
    this.pizzaList.forEach((tempPizza) => {
      if (tempPizza.pizzaId === pizzaId) {
        returnValue = tempPizza;
      }
    })
    return returnValue;
  }


}

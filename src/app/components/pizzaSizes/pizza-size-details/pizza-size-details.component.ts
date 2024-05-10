import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pizza } from '../../../classes/pizza';
import { PizzaSize } from '../../../classes/pizza-size';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { PizzaService } from '../../../services/pizza.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-pizza-size-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './pizza-size-details.component.html',
  styleUrl: './pizza-size-details.component.css'
})
export class PizzaSizeDetailsComponent implements OnInit {


  private tempPizzaSize = new PizzaSize;
  private pizzaService = inject(PizzaService);
  private route = inject(ActivatedRoute);
  private pizzaList: Pizza[] = [];
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    Promise.all([
      this.listAllPizzas(),
      this.getPizzaSizeDetails(this.route.snapshot.params[`pizzaSizeId`])
    ])

      .catch((error) => {
        console.error('Error loading functions', error);
      });
  }



  deletePizzaSize(pizzaSizeId: any) {
    if (confirm(`Remove this size?`)) {
      this.pizzaService.deletePizzaSize(pizzaSizeId)
        .then(() => {
          this.redirectAllSizes();
        })

        .catch(() => {
          alert(`Failed!`);
        })
    }
  }

  redirectUpdatePizzaSize(pizzaSizeId: any) {
    this.pizzaService.redirectUpdatePizzaSize(pizzaSizeId);
  }

  redirectAllSizes() {
    this.pizzaService.redirectAllSizes();
  }

  getPizzaSizeDetails(pizzaSizeId: any): Promise<any> {
    return new Promise(() => {
      this.pizzaService.getPizzaSizeDetails(pizzaSizeId)
        .then((response) => {
          setTimeout(() => {
            this.tempPizzaSize = response.data;
          })
        })
    })
  }

  listAllPizzas(): Promise<any> {
    return new Promise(() => {
      this.pizzaService.collectAllPizzas()
        .then((response) => {
          setTimeout(() => this.pizzaList = response.data);
        })
    })
  }

  orderPizza(pizzaId: any) {
    this.cartService.redirectCartItemForm(pizzaId);
  }

  getTempPizzaSize() {
    return this.tempPizzaSize;
  }

  hasAuthorityAdmin() {
    return this.authService.isAdmin();
  }

  hasAuthorityUser() {
    return this.authService.isUser();
  }

  getPizza(pizzaId: any) {
    var returnValue: Pizza = new Pizza;
    this.pizzaList.forEach((pizza) => {
      if (pizza.pizzaId === pizzaId) {
        returnValue = pizza;
      }
    })

    return returnValue;
  }

}

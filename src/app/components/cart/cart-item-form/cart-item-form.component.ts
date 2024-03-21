import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Pizza } from '../../../classes/pizza';
import { PizzaSize } from '../../../classes/pizza-size';
import { CartService } from '../../../services/cart.service';
import { PizzaService } from '../../../services/pizza.service';
import { ValidationService } from '../../../services/validation.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-cart-item-form',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './cart-item-form.component.html',
  styleUrl: './cart-item-form.component.css'
})
export class CartItemFormComponent implements OnInit, AfterViewInit {

  private allPizzaSizes: PizzaSize[] = [];
  private validationService = inject(ValidationService);
  private pizza: Pizza = new Pizza;
  private pizzaService = inject(PizzaService);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);


  ngOnInit(): void {
    Promise.all([this.getPizzaDetails(this.route.snapshot.params[`pizzaId`]), this.listAllPizzaSizes()])

      .catch((error) => {
        console.error('Error loading functions', error);
      });
  }

  ngAfterViewInit(): void {
    this.executeItemForm();
  }

  validateNumber(event: any) {
    return this.validationService.validateNumber(event);
  }

  listAllPizzaSizes(): Promise<any> {
    return new Promise(() => {
      this.pizzaService.collectAllSizes()
        .then((response) => {
          setTimeout(() => {
            this.allPizzaSizes = response.data
          })
        })
    })

  }

  getPizzaDetails(pizzaId: any): Promise<any> {
    return new Promise(() => {
      this.pizzaService.getPizzaDetails(pizzaId)
        .then((response) => {
          setTimeout(() => {
            this.pizza = response.data;
          })
        })
    })
  }

  redirectItemAdded() {
    this.cartService.redirectItemAdded();
  }

  getAllPizzaSizes(): PizzaSize[] {
    return this.allPizzaSizes;
  }

  getPizza(): Pizza {
    return this.pizza;
  }

  executeItemForm() {
    var form = document.getElementById(`itemForm`) as HTMLFormElement;
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      var formData = new FormData(form);
      var serializedData: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        serializedData[key] = value.toString().trim();
      });

      if (this.validationService.validateCartItem()) {
        await axios.post(`${this.cartService.getTargetUrl()}addCartItem`, {
          pizzaSizeId: serializedData[`pizzaSizeId`],
          quantity: serializedData[`quantity`]
        })
          .then(() => {
            this.cartService.redirectItemAdded();
          })

          .catch((error) => {
            if (error.response.status === 406) {
              alert(error.response.data);
            } else {
              console.log(error);
              alert(`Failed!`);
            }
          });
      }
    });
  }

}

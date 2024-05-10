import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartItem } from '../../../classes/cart-item';
import { Pizza } from '../../../classes/pizza';
import { PizzaSize } from '../../../classes/pizza-size';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { PizzaService } from '../../../services/pizza.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private allCartItems: CartItem[] = [];
  private allPizzaSizes: PizzaSize[] = [];
  private allPizzas: Pizza[] = [];
  private cartService = inject(CartService);
  private pizzaService = inject(PizzaService);
  private orderService = inject(OrderService);

  ngOnInit(): void {
    Promise.all([this.getMyCart(), this.listAllPizzas(), this.listAllPizzaSizes()])

      .catch((error) => {
        console.error('Error loading functions', error);
      });
  }

  redirectAllPizzas() {
    this.pizzaService.redirectAllPizzas();
  }

  redirectValidateCart(cartId: any) {
    throw new Error('Method not implemented.');
  }
  eraseAllItems() {
    if (confirm(`Remove all items?`)) {
      this.cartService.eraseAllItems()
        .then(() => {
          this.getMyCart();
          this.cartService.redirectCart();
        })

        .catch(() => {
          alert(`Failed!`);
        })
    }

  }

  eraseItem(itemId: any) {
    if (confirm(`Remove this item?`)) {
      this.cartService.eraseItem(itemId)
        .then(() => {
          this.getMyCart();
          this.cartService.redirectCart();
        })

        .catch(() => {
          alert(`Failed!`);
        })
    }
  }

  getMyCart(): Promise<any> {
    return new Promise(() => {
      this.cartService.getMyCart()
        .then((response) => {
          setTimeout(() => {
            this.allCartItems = response.data;
          })
        })
    })
  }


  listAllPizzas(): Promise<any> {
    return new Promise(() => {
      this.pizzaService.collectAllPizzas()
        .then((response) => {
          setTimeout(() => {
            this.allPizzas = response.data;
          })
        })
    })
  }

  listAllPizzaSizes() {
    return new Promise(() => {
      this.pizzaService.collectAllSizes()
        .then((response) => {
          setTimeout(() => {
            this.allPizzaSizes = response.data;
          })
        })
    })
  }

  calculateGrandTotal(cartItems: CartItem[]) {
    var returnValue = 0;
    cartItems.forEach(item => {
      if (item.price) {
        returnValue = returnValue + item.price;
      }
    })
    return returnValue;
  }

  checkout() {
    this.orderService.checkout()
      .then(() => {
        this.orderService.redirectAddressConfirm();
      })

      .catch((error) => {
        if (error.response.status === 406) {
          this.cartService.redirectInvalidCart();
        } else {
          alert(`Failed!`);
        }

      })
  }

  getAllCartItems(): CartItem[] {
    return this.allCartItems;
  }

  getAllPizzaSizes(): PizzaSize[] {
    return this.allPizzaSizes;
  }

  getAllPizzas(): Pizza[] {
    return this.allPizzas;
  }
}

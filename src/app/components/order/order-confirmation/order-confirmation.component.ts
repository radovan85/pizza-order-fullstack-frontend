import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartItem } from '../../../classes/cart-item';
import { Pizza } from '../../../classes/pizza';
import { PizzaSize } from '../../../classes/pizza-size';
import { ShippingAddress } from '../../../classes/shipping-address';
import { CartService } from '../../../services/cart.service';
import { CustomerService } from '../../../services/customer.service';
import { OrderService } from '../../../services/order.service';
import { PizzaService } from '../../../services/pizza.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent implements OnInit {

  private shippingAddress: ShippingAddress = new ShippingAddress;
  private allCartItems: CartItem[] = [];
  private allPizzaSizes: PizzaSize[] = [];
  private allPizzas: Pizza[] = [];
  private orderService = inject(OrderService);
  private pizzaService = inject(PizzaService);
  private cartService = inject(CartService);
  private customerService = inject(CustomerService);

  ngOnInit(): void {
    Promise.all([this.getMyAddress(), this.getMyCart(), this.listAllPizzas(), this.listAllPizzaSizes()])

      .catch((error) => {
        console.error(`Error loading functions  ${error}`);
      });
  }



  getMyAddress(): Promise<any> {
    return new Promise(() => {
      this.customerService.getMyAddress()
        .then((response) => {
          setTimeout(() => {
            this.shippingAddress = response.data;
          })
        })
    });
  }

  executeOrder() {
    this.orderService.executeOrder()
      .then(() => {
        this.orderService.redirectOrderCompleted();
      })

      .catch(() => {
        alert(`Failed!`);
      })
  }

  redirectCancelOrder() {
    this.orderService.redirectCancelOrder();
  }

  redirectPhoneConfirmation() {
    this.orderService.redirectPhoneConfirmation();
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



  listAllPizzaSizes(): Promise<any> {
    return new Promise(() => {
      this.pizzaService.collectAllSizes()
        .then((response) => {
          setTimeout(() => {
            this.allPizzaSizes = response.data;
          })
        })
    })
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

  getAllCartItems(): CartItem[] {
    return this.allCartItems;
  }

  getAllPizzaSizes(): PizzaSize[] {
    return this.allPizzaSizes;
  }

  getAllPizzas(): Pizza[] {
    return this.allPizzas;
  }

  getShippingAddress(): ShippingAddress {
    return this.shippingAddress;
  }




}

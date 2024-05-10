import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../classes/order';
import { OrderAddress } from '../../../classes/order-address';
import { OrderItem } from '../../../classes/order-item';
import { OrderService } from '../../../services/order.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  private address: OrderAddress = new OrderAddress;
  private order: Order = new Order;
  private orderedItems: OrderItem[] = [];
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    Promise.all([
      this.listAllItems(this.route.snapshot.params[`orderId`]),
      this.getOrderDetails(this.route.snapshot.params[`orderId`]),
      this.getAddressDetails(this.route.snapshot.params[`orderId`])
    ])

      .catch(() => {
        console.log(`Error occured while loading functions`);
      })
  }

  deleteOrder(orderId: any) {
    if (confirm(`Remove this order?`)) {
      this.orderService.deleteOrder(orderId)
        .then(() => {
          this.orderService.redirectAllOrders();
        })

        .catch(() => {
          alert(`Failed!`);
        })
    }
  }

  redirectAllOrders() {
    this.orderService.redirectAllOrders();
  }

  listAllItems(orderId: any): Promise<any> {
    return new Promise(() => {
      this.orderService.collectAllItems(orderId)
        .then((response) => {
          setTimeout(() => {
            this.orderedItems = response.data;
          })
        })
    })
  }

  getOrderDetails(orderId: any): Promise<any> {
    return new Promise(() => {
      this.orderService.getOrderDetails(orderId)
        .then((response) => {
          setTimeout(() => {
            this.order = response.data;
          })
        })
    })
  }

  getAddressDetails(orderId: any): Promise<any> {
    return new Promise(() => {
      this.orderService.getAddressDetails(orderId)
        .then((response) => {
          setTimeout(() => {
            this.address = response.data;
          })
        })
    })
  }

  getAddress(): OrderAddress {
    return this.address;
  }

  getOrder(): Order {
    return this.order;
  }

  getOrderedItems(): OrderItem[] {
    return this.orderedItems;
  }

}

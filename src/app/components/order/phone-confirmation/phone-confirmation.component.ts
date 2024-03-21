import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import axios from 'axios';
import { Customer } from '../../../classes/customer';
import { CustomerService } from '../../../services/customer.service';
import { OrderService } from '../../../services/order.service';
import { ValidationService } from '../../../services/validation.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-phone-confirmation',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './phone-confirmation.component.html',
  styleUrl: './phone-confirmation.component.css'
})
export class PhoneConfirmationComponent implements OnInit, AfterViewInit {

  private customer: Customer = new Customer;
  private customerService = inject(CustomerService);
  private orderService = inject(OrderService);
  private validationService = inject(ValidationService);

  ngOnInit(): void {
    this.getCurrentCustomer();
  }

  ngAfterViewInit(): void {
    this.executeCustomerForm();
  }

  getCurrentCustomer(): Promise<any> {
    return new Promise(() => {
      this.customerService.getCurrentCustomer()
        .then((response) => {
          setTimeout(() => {
            this.customer = response.data;
          })
        })
    })

  }

  redirectCancelOrder() {
    this.orderService.redirectCancelOrder();
  }

  redirectAddressConfirm() {
    this.orderService.redirectAddressConfirm();
  }



  validateNumber(event: any) {
    return this.validationService.validateNumber(event);
  }

  redirectOrderConfirmation() {
    this.orderService.redirectOrderConfirmation();
  }

  getCustomer() {
    return this.customer;
  }

  executeCustomerForm() {
    var form = document.getElementById(`customerForm`) as HTMLFormElement;
    form.addEventListener(`submit`, async (event) => {
      event.preventDefault();

      var formData = new FormData(form);
      var serializedData: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        serializedData[key] = value.toString().trim();
      });

      if (this.validationService.validateCustomer()) {
        await axios.put(`${this.customerService.getTargetUrl()}updateCustomer`, {
          customerPhone: serializedData[`customerPhone`]
        })
          .then(() => {
            this.orderService.redirectOrderConfirmation();
          })

          .catch((error) => {
            console.log(error);
            alert(`Failed!`);
          });
      }
    });
  }


}

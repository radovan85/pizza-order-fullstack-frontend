import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import axios from 'axios';
import { ShippingAddress } from '../../../classes/shipping-address';
import { CustomerService } from '../../../services/customer.service';
import { OrderService } from '../../../services/order.service';
import { ValidationService } from '../../../services/validation.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-address-confirmation',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './address-confirmation.component.html',
  styleUrl: './address-confirmation.component.css'
})
export class AddressConfirmationComponent implements OnInit, AfterViewInit {

  private shippingAddress: ShippingAddress = new ShippingAddress;
  private orderService = inject(OrderService);
  private customerService = inject(CustomerService);
  private validationService = inject(ValidationService);

  ngOnInit(): void {
    this.getMyAddress();
  }

  ngAfterViewInit(): void {
    this.executeAddressForm();
  }

  redirectCancelOrder() {
    this.orderService.redirectCancelOrder();
  }

  getMyAddress(): Promise<any> {
    return new Promise(() => {
      this.customerService.getMyAddress()
        .then((response) => {
          setTimeout(() => {
            this.shippingAddress = response.data;
          })
        })
    })
  }

  getShippingAddress(): ShippingAddress {
    return this.shippingAddress;
  }

  executeAddressForm() {
    var form = document.getElementById(`addressForm`) as HTMLFormElement;
    form.addEventListener(`submit`, async (event) => {
      event.preventDefault();

      var formData = new FormData(form);
      var serializedData: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        serializedData[key] = value.toString().trim();
      });

      if (this.validationService.validateShippingAddress()) {
        await axios.put(`${this.customerService.getTargetUrl()}updateShippingAddress/${this.shippingAddress.shippingAddressId}`, {
          city: serializedData[`city`],
          postcode: serializedData[`postcode`],
          address: serializedData[`address`],
        })
          .then(() => {
            this.orderService.redirectPhoneConfirmation();
          })

          .catch((error) => {
            console.log(error);
            alert(`Failed!`);
          });
      }
    });
  }

}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Customer } from '../../../classes/customer';
import { RegistrationForm } from '../../../classes/registration-form';
import { ShippingAddress } from '../../../classes/shipping-address';
import { User } from '../../../classes/user';
import { ValidationService } from '../../../services/validation.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements AfterViewInit {

  private validationService = inject(ValidationService);
  private router = inject(Router);

  ngAfterViewInit(): void {
    this.executePizzaForm();
  }

  validateNumber(value: any) {
    return this.validationService.validateNumber(value);
  }

  redirectLogin() {
    this.router.navigate([`login`]);
  }

  executePizzaForm() {
    var form = document.getElementById(`registrationForm`) as HTMLFormElement;

    // Add an event listener for form submission
    form.addEventListener(`submit`, async (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Serialize the form data manually
      var formData = new FormData(form);
      var serializedData: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        serializedData[key] = value.toString().trim();
      });

      // Create user, customer, and shipping address objects
      var user = new User;
      user.firstName = serializedData[`firstName`];
      user.lastName = serializedData[`lastName`];
      user.email = serializedData[`email`];
      user.password = serializedData[`password`];

      var customer = new Customer;
      customer.customerPhone = serializedData[`phone`];

      var shippingAddress = new ShippingAddress;
      shippingAddress.address = serializedData[`address`];
      shippingAddress.city = serializedData[`city`];
      shippingAddress.postcode = serializedData[`postcode`];

      var regForm = new RegistrationForm;
      regForm.user = user;
      regForm.customer = customer;
      regForm.shippingAddress = shippingAddress;

      if (this.validationService.validateRegForm()) {

        await axios.post(`http://localhost:8080/register`, {
          user: {
            firstName: serializedData[`firstName`],
            lastName: serializedData[`lastName`],
            email: serializedData[`email`],
            password: serializedData[`password`]
          },
          customer: {
            customerPhone: serializedData[`phone`]
          },
          shippingAddress: {
            address: serializedData[`address`],
            city: serializedData[`city`],
            postcode: serializedData[`postcode`]
          }
        })
          .then(() => {
            this.router.navigate([`registration/Passed`]);
          })
          .catch((error) => {
            if (error.response.status === 409) {
              this.router.navigate([`registration/Failed`]);
            } else {
              alert(`Failed!`);
            }
          });

      }
    });
  }


}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import axios from 'axios';
import { Pizza } from '../../../classes/pizza';
import { PizzaService } from '../../../services/pizza.service';
import { ValidationService } from '../../../services/validation.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-pizza-size-form',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './pizza-size-form.component.html',
  styleUrl: './pizza-size-form.component.css'
})
export class PizzaSizeFormComponent implements OnInit, AfterViewInit {


  private pizzaList: Pizza[] = [];
  private validationService = inject(ValidationService);
  private pizzaService = inject(PizzaService);

  ngOnInit(): void {
    this.listAllPizzas();
  }

  ngAfterViewInit(): void {
    this.executePizzaSizeForm();
  }

  validateNumber(value: any) {
    return this.validationService.validateNumber(value);
  }

  listAllPizzas(): Promise<any> {
    return new Promise(() => {
      this.pizzaService.collectAllPizzas()
        .then((response) => {
          setTimeout(() => this.pizzaList = response.data);
        })
    })
  }

  executePizzaSizeForm() {
    var form = document.getElementById(`pizzaSizeForm`) as HTMLFormElement;
    // Add an event listener for form submission
    form.addEventListener(`submit`, async (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Serialize the form data manually
      var formData = new FormData(form);
      var serializedData: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        serializedData[key] = value.toString().trim();
      });

      if (this.validationService.validatePizzaSize()) {
        await axios.post(`${this.pizzaService.getAdminUrl()}storePizzaSize`, {
          pizzaId: serializedData[`pizzaId`],
          name: serializedData[`name`],
          price: serializedData[`price`]
        })
          .then(() => {
            this.pizzaService.redirectAllSizes();
          })

          .catch((error) => {
            if (error.response.status === 409) {
              this.pizzaService.redirectPizzaSizeError();
            } else {
              console.log(error);
              alert(`Failed!`);
            }
          });
      }
    });
  }

  getPizzaList(): Pizza[] {
    return this.pizzaList;
  }



}

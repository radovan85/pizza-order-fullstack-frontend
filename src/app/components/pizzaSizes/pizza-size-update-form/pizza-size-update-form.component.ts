import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Pizza } from '../../../classes/pizza';
import { PizzaSize } from '../../../classes/pizza-size';
import { PizzaService } from '../../../services/pizza.service';
import { ValidationService } from '../../../services/validation.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-pizza-size-update-form',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './pizza-size-update-form.component.html',
  styleUrl: './pizza-size-update-form.component.css'
})
export class PizzaSizeUpdateFormComponent implements OnInit, AfterViewInit {

  private pizzaSize: PizzaSize = new PizzaSize;
  private pizzaList: Pizza[] = [];
  private pizzaService = inject(PizzaService);
  private validationService = inject(ValidationService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    Promise.all([
      this.listAllPizzas(),
      this.getPizzaSizeDetails(this.route.snapshot.params[`pizzaSizeId`]),
    ])

      .catch((error) => {
        console.log(`Error loading functions  ${error}`);
      })
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

  getPizzaSizeDetails(pizzaSizeId: any): Promise<any> {
    return new Promise(() => {
      this.pizzaService.getPizzaSizeDetails(pizzaSizeId)
        .then((response) => {
          setTimeout(() => {
            this.pizzaSize = response.data;
          })
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
        await axios.put(`${this.pizzaService.getAdminUrl()}updatePizzaSize/${this.pizzaSize.pizzaSizeId}`, {
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

  getPizzaSize(): PizzaSize {
    return this.pizzaSize;
  }


}

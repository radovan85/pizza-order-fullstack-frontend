import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import axios from 'axios';
import { PizzaService } from '../../../services/pizza.service';
import { ValidationService } from '../../../services/validation.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-pizza-form',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './pizza-form.component.html',
  styleUrl: './pizza-form.component.css'
})
export class PizzaFormComponent implements AfterViewInit {

  private pizzaService = inject(PizzaService);
  private validationService = inject(ValidationService);

  ngAfterViewInit(): void {
    this.executePizzaForm();
  }

  executePizzaForm() {
    var form = document.getElementById(`pizzaForm`) as HTMLFormElement;
    // Add an event listener for form submission
    form.addEventListener(`submit`, async (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Serialize the form data manually
      var formData = new FormData(form);
      var serializedData: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        serializedData[key] = value.toString().trim();
      });

      if (this.validationService.validatePizza()) {
        await axios.post(`${this.pizzaService.getAdminUrl()}storePizza`, {
          name: serializedData[`name`],
          description: serializedData[`description`],
          imageUrl: serializedData[`imageUrl`]
        })
          .then(() => {
            this.pizzaService.redirectAllPizzas();
          })

          .catch((error) => {
            console.log(error);
            alert(`Failed!`);
          });
      }
    });
  }


}

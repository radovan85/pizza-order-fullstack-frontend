import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Pizza } from '../../../classes/pizza';
import { PizzaService } from '../../../services/pizza.service';
import { ValidationService } from '../../../services/validation.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-pizza-update-form',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './pizza-update-form.component.html',
  styleUrl: './pizza-update-form.component.css'
})
export class PizzaUpdateFormComponent implements OnInit, AfterViewInit {

  private pizzaService = inject(PizzaService);
  private route = inject(ActivatedRoute);
  private pizza = new Pizza;
  private validationService = inject(ValidationService);

  ngOnInit(): void {
    Promise.all([
      this.getPizzaDetails(this.route.snapshot.params[`pizzaId`])
    ])

      .catch((error) => {
        console.log(`Error loading functions ${error}`);
      })
  }

  ngAfterViewInit(): void {
    this.executePizzaForm();
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

  getPizza(): Pizza {
    return this.pizza;
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
        await axios.put(`${this.pizzaService.getAdminUrl()}updatePizza/${this.pizza.pizzaId}`, {
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

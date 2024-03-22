import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Pizza } from '../../../classes/pizza';
import { PizzaSize } from '../../../classes/pizza-size';
import { AuthService } from '../../../services/auth.service';
import { PizzaService } from '../../../services/pizza.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-pizza-size-list',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './pizza-size-list.component.html',
  styleUrl: './pizza-size-list.component.css'
})
export class PizzaSizeListComponent implements OnInit {


  private pizzaSizeList: PizzaSize[] = [];
  private pizzaList: Pizza[] = [];
  private pizzaService = inject(PizzaService);
  private authService = inject(AuthService);
  private paginatedPizzaSizeList: PizzaSize[] = [];
  private pageSize = 5;
  private currentPage = 1;
  private totalPages = 1;

  ngOnInit(): void {
    Promise.all([
      this.listAllPizzas(),
      this.listAllPizzaSizes(),
    ])

      .catch((error) => {
        console.error(`Error loading functions  ${error}`);
      });
  }

  deletePizzaSize(pizzaSizeId: any) {
    if (confirm(`Remove this size?`)) {
      this.pizzaService.deletePizzaSize(pizzaSizeId)
        .then(() => {
          this.listAllPizzaSizes();
          this.pizzaService.redirectAllSizes();
        })

        .catch(() => {
          alert(`Failed!`);
        })
    }
  }

  redirectPizzaSizeDetails(pizzaSizeId: any) {
    this.pizzaService.redirectPizzaSizeDetails(pizzaSizeId);
  }

  redirectAddPizzaSize() {
    this.pizzaService.redirectAddPizzaSize();
  }

  redirectUpdatePizzaSize(pizzaSizeId: any) {
    this.pizzaService.redirectUpdatePizzaSize(pizzaSizeId);
  }

  redirectAllPizzas() {
    this.pizzaService.redirectAllPizzas();
  }

  listAllPizzas(): Promise<any> {
    return new Promise(() => {
      this.pizzaService.collectAllPizzas()
        .then((response) => {
          setTimeout(() => this.pizzaList = response.data);
        })
    })
  }

  listAllPizzaSizes(): Promise<any> {
    return new Promise(() => {
      this.pizzaService.collectAllSizes()
        .then((response) => {
          setTimeout(() => {
            this.pizzaSizeList = response.data;
            this.totalPages = Math.ceil(this.pizzaSizeList.length / this.pageSize);
            this.setPage(1);
          });
        })
    })
  }

  getPizzaSizeList() {
    return this.pizzaSizeList;
  }

  hasAuthorityAdmin() {
    return this.authService.isAdmin();
  }

  getPizza(pizzaId: any): Pizza {
    var returnValue: Pizza = new Pizza;
    this.pizzaList.forEach((tempPizza) => {
      if (tempPizza.pizzaId === pizzaId) {
        returnValue = tempPizza;
      }
    })
    return returnValue;
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.paginatedPizzaSizeList = this.pizzaSizeList.slice((page - 1) * this.pageSize, page * this.pageSize);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }

  prevPage() {
    this.setPage(this.currentPage - 1);
  }

  getPageSize(): number {
    return this.pageSize;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  getTotalPages(): number {
    return this.totalPages;
  }

  getPaginatedPizzaSizeList(): PizzaSize[] {
    return this.paginatedPizzaSizeList;
  }


}

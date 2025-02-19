import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pizza } from '../../../classes/pizza';
import { PizzaSize } from '../../../classes/pizza-size';
import { AuthService } from '../../../services/auth.service';
import { PizzaService } from '../../../services/pizza.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-pizza-size-list-by-pizza',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './pizza-size-list-by-pizza.component.html',
  styleUrl: './pizza-size-list-by-pizza.component.css'
})
export class PizzaSizeListByPizzaComponent implements OnInit {


  private pizzaSizeList: PizzaSize[] = [];
  private pizza: Pizza = new Pizza;
  private pizzaService = inject(PizzaService);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private paginatedPizzaSizeList: PizzaSize[] = [];
  private pageSize = 5;
  private currentPage = 1;
  private totalPages = 1;


  ngOnInit(): void {
    Promise.all([
      this.getPizzaDetails(this.route.snapshot.params[`pizzaId`]),
      this.listAllPizzaSizesByPizza(this.route.snapshot.params[`pizzaId`]),
    ])

      .catch((error) => {
        console.log(`Errors occured while loading functions  ${error}`);
      })
  }


  redirectAddPizzaSize() {
    this.pizzaService.redirectAddPizzaSize();
  }

  redirectAllPizzas() {
    this.pizzaService.redirectAllPizzas();
  }

  deletePizzaSize(pizzaSizeId: any) {
    if (confirm(`Remove this pizza size`)) {
      this.pizzaService.deletePizzaSize(pizzaSizeId)
        .then(() => {
          this.listAllPizzaSizesByPizza(this.pizza.pizzaId);
          this.pizzaService.redirectAllSizesByPizza(this.pizza.pizzaId);
        })
    }
  }

  redirectPizzaSizeDetails(pizzaSizeId: any) {
    this.pizzaService.redirectPizzaSizeDetails(pizzaSizeId);
  }

  redirectUpdatePizzaSize(pizzaSizeId: any) {
    this.pizzaService.redirectUpdatePizzaSize(pizzaSizeId);
  }

  listAllPizzaSizesByPizza(pizzaId: any): Promise<any> {
    return new Promise(() => {
      this.pizzaService.collectAllSizesByPizza(pizzaId)
        .then((response) => {
          setTimeout(() => {
            this.pizzaSizeList = response.data
            this.totalPages = Math.ceil(this.pizzaSizeList.length / this.pageSize);
            this.setPage(1);
          })
        })
    })
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

  hasAuthorityAdmin(): boolean {
    return this.authService.isAdmin();
  }

  hasAuthorityUser(): boolean {
    return this.authService.isUser();
  }

  getPizzaSizeList(): PizzaSize[] {
    return this.pizzaSizeList;
  }

  getPizza(): Pizza {
    return this.pizza;
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

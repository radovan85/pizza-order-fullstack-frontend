import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-pizza-size-error',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './pizza-size-error.component.html',
  styleUrl: './pizza-size-error.component.css'
})
export class PizzaSizeErrorComponent {

  private router = inject(Router);

  redirectHome() {
    this.router.navigate([`home`]);
  }

}

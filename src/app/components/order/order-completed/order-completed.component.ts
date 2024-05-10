import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-order-completed',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './order-completed.component.html',
  styleUrl: './order-completed.component.css'
})
export class OrderCompletedComponent {

  private router = inject(Router);

  redirectHome() {
    this.router.navigate([`home`]);
  }

}

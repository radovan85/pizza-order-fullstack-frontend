import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-registration-passed',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './registration-passed.component.html',
  styleUrl: './registration-passed.component.css'
})
export class RegistrationPassedComponent {

  private router = inject(Router);

  redirectLogin() {
    this.router.navigate([`login`]);
  }

}

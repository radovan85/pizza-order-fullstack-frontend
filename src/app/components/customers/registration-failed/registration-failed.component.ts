import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-registration-failed',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './registration-failed.component.html',
  styleUrl: './registration-failed.component.css'
})
export class RegistrationFailedComponent {

  private router = inject(Router);

  redirectRegister() {
    this.router.navigate([`registration`]);
  }
  redirectHome() {
    this.router.navigate([`home`]);
  }

}

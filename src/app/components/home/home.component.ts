import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  constructor(private authService: AuthService, private userService: UserService) { }

  ngAfterViewInit(): void {
    this.userService.getCurrentUser();
  }

  hasAuthorityAdmin(): boolean {
    return this.authService.isAdmin();
  }

  hasAuthorityUser(): boolean {
    return this.authService.isUser();
  }
}

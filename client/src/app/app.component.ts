import { Router } from '@angular/router';
import { UserService } from './core/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project4';
  constructor(private userService :UserService, private router: Router) {}

  get currentUser() {
    return this.userService.getCurrentUser();
  }
  logout() {
    this.userService.purgeAuth();
    this.router.navigate(['/']);
  }
}

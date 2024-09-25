import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [AuthServiceService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  public name: string = 'login';
  public email: string = '';
  public password: string = '';
  public error: object = {};

  constructor(private auth: AuthServiceService) {}
  login() {
    // encrypt the password

    this.auth.login(); // prints 'AuthServiceService login'
    alert(this.email + ' ' + this.password);
  }
}

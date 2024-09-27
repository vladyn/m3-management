import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { CryptoServiceService } from '../crypto-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [AuthServiceService, CryptoServiceService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public error: object = {};

  constructor(private auth: AuthServiceService, private crypto: CryptoServiceService) {}
  login() {
    this.auth.getToken(this.username, this.crypto.encryptData(this.password));
  }
}

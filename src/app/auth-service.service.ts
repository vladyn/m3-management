import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(http: HttpClient) {
    console.log('AuthServiceService constructor');
    console.log(http);
    console.log(environment.authToken);
    console.log(environment.version);
    console.log(environment.appName);
   }

   login(email: string, password: string) {
     console.log('AuthServiceService login');
 }
}

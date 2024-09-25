import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(http: HttpClient) {
    console.log('AuthServiceService constructor');
    console.log(http);
   }

   login() {
     console.log('AuthServiceService login');
   }
}

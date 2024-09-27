import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) { }

   getToken(username: string, password: string) {
    return this.http.post(environment.authToken, {username, password}).subscribe((response) => {
      console.log(response);
    });
 }
}

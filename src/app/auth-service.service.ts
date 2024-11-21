import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { urlString } from './utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) { }

   getToken(username: string, password: string) {
    const requestBody: Request = {client_id: 'matrix3ui', username, password };
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const options = { headers };
    return this.http.post(environment.authToken, urlString(requestBody), options).subscribe((response) => response);
 }
}

interface Request {
  username: string,
  password: string,
  client_id: string,
}

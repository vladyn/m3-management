import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { urlString } from '../../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthDmsService {
  constructor(private http: HttpClient) { }

  getToken() {
    const requestBody: Request = {
        client_id: environment.client_id,
        client_secret: environment.client_secret,
        grant_type: environment.grant_type,
        scope: environment.scope,
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const options = { headers };
    return this.http.post(`${environment.dms_api_url}/connect/token?grant_type=client_credentials`, urlString(requestBody), options).subscribe((response) => {
      console.log(response);
    });
 }
}

interface Request {
  grant_type: string,
  client_secret: string,
  client_id: string,
  scope: string,
}

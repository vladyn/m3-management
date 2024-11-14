import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { urlString } from '../../utils/helpers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDmsService {
  constructor(private http: HttpClient) { }

  getToken() {
    if (this.isTokenExist()) {
      return localStorage.getItem('token_dms');
    }
    const requestBody: Request = {
        client_id: environment.client_id,
        client_secret: environment.client_secret,
        grant_type: environment.grant_type,
        scope: environment.scope,
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const options = { headers };
    return this.http.post<Response> (`${environment.dms_api_url}/connect/token?grant_type=client_credentials`, urlString(requestBody), options).subscribe((response) => {
      if (response['access_token']) {
        this.setToken(response['access_token']); // TODO: validate the token before setting it
      }
    });
 }

 getCabinets(): Observable<any> {
   return this.http.get(`${environment.dms_api_url}/api/v1.4/cabinets`);
 }

  getContents() {
    return this.http.get(`${environment.dms_api_url}/content/v1.4`);
  }

  getFileMetadata(fileId: number = 145) {
    return this.http.get(`${environment.dms_api_url}/api/v1.4/items/${fileId}/_metadata`);
  }

  getFileBlob(
    uniformName: string = 'E_ValentinaY_D_2024-11-05_H_080017_393_CLID_00898869786.wav (ID 00145).wav',
    path: string = 'TestQuantumDMS\\Summer campaign',
  ) {
    const currentPath = path.replace(/\\/g, '/');
    return this.http.get(`${environment.dms_api_url}/content/v1.4/${currentPath}/${uniformName}/_blob`, { responseType: 'blob' });
  }

  isTokenExist() {
    return localStorage.getItem('token_dms') ? true : false;
  }

  setToken(token: string) {
    localStorage.setItem('token_dms', token);
  }
}

interface Request {
  grant_type: string,
  client_secret: string,
  client_id: string,
  scope: string,
}

interface Response {
  access_token: string,
  token_type: string,
  expires_in: number,
}

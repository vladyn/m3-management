import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../../environment';
import { urlString } from '../../utils/helpers';
import { Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthDmsService {
  constructor(private http: HttpClient) {}

  getToken(): Observable<string | null> {
    const requestBody: Request = {
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      grant_type: environment.grant_type,
      scope: environment.scope,
    };
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    const options = { headers };
    return this.http
      .post<Response>(
        `${environment.dms_api_url}/connect/token?grant_type=client_credentials`,
        urlString(requestBody),
        options
      )
      .pipe(
        catchError((error) => {
          throw error;
        }),
        map((response: Response) => {
          this.setToken(response.access_token);
          return response.access_token;
        })
      );
  }

  isTokenExist(): Observable<string | null> {
    const tokenTime = localStorage.getItem('token_dms_time');
    if (tokenTime) {
      const currentTime = new Date().getTime();
      const tokenTimeInt = parseInt(tokenTime, 10);
      if (currentTime - tokenTimeInt > 86400000) {
        return this.getToken();
      }
    } else {
      this.getToken().subscribe({
        next: (token) => {
          if (token) {
            this.setToken(token);
            return of(token);
          }
          return this.getToken();
        },
        error: (error) => {
          throw error;
        }
      });
    }
    return of(localStorage.getItem('token_dms'));
  }

  setToken(token: string): void {
    localStorage.setItem('token_dms', token);
    localStorage.setItem('token_dms_time', new Date().getTime().toString());
  }

  getFileMetadata(fileId: number): Observable<any> {
    return this.http.get(
      `${environment.dms_api_url}/api/v1.4/items/${fileId}/_metadata`
    );
  }

  getFileBlob(
    uniformName: string = 'E_ValentinaY_D_2024-11-05_H_080017_393_CLID_XXXXXXXXXXX.wav (ID 00145).wav',
    path: string = 'TestQuantumDMS\\Summer campaign'
  ): Observable<Blob> {
    const currentPath = path.replace(/\\/g, '/');
    return this.http.get(
      `${environment.dms_api_url}/content/v1.4/${currentPath}/${uniformName}/_blob`,
      { responseType: 'blob' }
    );
  }
}

interface Request {
  grant_type: string;
  client_secret: string;
  client_id: string;
  scope: string;
}

interface Response {
  access_token: string;
  token_type: string;
  expires_in: number;
}

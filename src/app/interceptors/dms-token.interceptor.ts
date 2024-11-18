import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AuthDmsService } from '../services/auth-dms.service/auth-dms.service';

@Injectable()
export class DmsTokenInterceptor implements HttpInterceptor {
  constructor(private authDmsService: AuthDmsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.authDmsService.isTokenExist()
      .pipe(
        catchError((error) => {
          throw error;
        })
      )
      .subscribe((token: any) => {
        if (token && !request.url.includes('/connect/token?grant_type=client_credentials')) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(request);
        }
        return next.handle(request);
      });
      return next.handle(request);
  }
}

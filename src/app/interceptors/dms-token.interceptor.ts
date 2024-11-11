import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthDmsService } from '../services/auth-dms.service/auth-dms.service';

@Injectable()
export class DmsTokenInterceptor implements HttpInterceptor {
  constructor(private authDmsService: AuthDmsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('dms')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authDmsService.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
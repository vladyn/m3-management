import { Injectable } from '@angular/core';
import type { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs';
import type { Observable } from 'rxjs';
import { AuthDmsService } from '../services/auth-dms.service/auth-dms.service';

@Injectable()
export class DmsTokenInterceptor implements HttpInterceptor {
  constructor(private readonly authDmsService: AuthDmsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/connect/token?grant_type=client_credentials')) {
      return next.handle(request);
    }
    return next.handle(request);
    // return this.authDmsService.isTokenExist().pipe(
    //   catchError((error) => {
    //     throw error;
    //   }),
    //   switchMap((token: string) => {
    //     const headers = request.headers.set('Authorization', `Bearer ${token}`);
    //     const newRequest = request.clone({ headers });
    //     return next.handle(newRequest);
    //   })
    // );
  }
}

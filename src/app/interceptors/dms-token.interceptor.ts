import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, catchError, switchMap } from 'rxjs';
import { AuthDmsService } from '../services/auth-dms.service/auth-dms.service';

@Injectable()
export class DmsTokenInterceptor implements HttpInterceptor {
  constructor(private authDmsService: AuthDmsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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

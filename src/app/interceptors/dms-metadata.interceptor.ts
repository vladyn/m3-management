import { map, filter, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpInterceptor,
  HttpEvent,
} from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable()
export class DmsMetadataInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (!request.url.endsWith('_metadata')) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        throw error;
      }),
      filter((event) => event instanceof HttpResponse),
      map((response: HttpResponse<any>):HttpResponse<any> => {
        const { body: metadata } = response;
        const path = metadata.metadata.find((item: any) => item.internalName === 'Path')?.value;
        const result = metadata.metadata.reduce((acc: any[], item: any) => {
          for (const [key, value] of matchingKeys) {
            if (item.internalName === key) {
              item.value ? acc.push({ [value]: item.value }) : acc.push({ [value]: item.identities[0] });
            }
          }
          return acc;
      }, []);

        const patchedResponse = {
          id: metadata.uniqueId,
          name: metadata.uniformName,
          metadata: result,
          path,
        };
        console.log(patchedResponse);
        return response.clone({ body: patchedResponse });
      })
    );
  }
}

const matchingKeys = new Map(
  [
    ['Created', 'created'],
    ['Created by', 'createdBy']
  ]
);

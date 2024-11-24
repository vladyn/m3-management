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
              item.value ? acc.push({ [value]: item.value }) : acc.push({ [value]: item.identities });
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
        return response.clone({ body: patchedResponse });
      })
    );
  }
}

const matchingKeys = new Map(
  [
    ['Name', 'uniformName'],
    ['File size', 'size'],
    ['Extension', 'type'],
    ['Status', 'status'],
    ['Content type', 'document'],
    ['File name with extension', 'name'],
    ['File name without extension', 'name'],
    ['Created', 'created'],
    ['Created by', 'createdBy'],
    ['Modified', 'modified'],
    ['Modified by', 'modifiedBy'],
    ['Path', 'path'],
    ['File type', 'fileType'],
    ['Cabinet ID', 'cabinetId'],
    ['processing_status', 'processingStatus'],
    ['autoscore_result', 'autoscoreResult']
  ]
);

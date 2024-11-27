import { DmsMetadataInterceptor } from './dms-metadata.interceptor';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs";


describe('DmsTokenInterceptor', () => {
  let interceptor: DmsMetadataInterceptor;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    interceptor = new DmsMetadataInterceptor();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create an instance', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept', () => {
    class MockHttpHandler extends HttpHandler {
      handle(req: HttpRequest<any>): Observable<any> {
        return new Observable(observer => {
          observer.next({});
          observer.complete();
        });
      }
    }

    interceptor.intercept(new HttpRequest('GET', 'https://dms:443/api/v1.4/items/145/_metadata'), new MockHttpHandler())
        .subscribe((response) => {
            expect(response).toEqual({} as HttpEvent<any>);
        });

    expect(interceptor.intercept).toBeTruthy();
    expect(localStorage.getItem('token_dms')).toBeNull();
  });

  it('should not intercept', () => {
    class MockHttpHandler extends HttpHandler {
      handle(req: HttpRequest<any>): Observable<any> {
        return new Observable(observer => {
          observer.next({});
          observer.complete();
        });
      }
    }

    interceptor.intercept(new HttpRequest('GET', 'https://dms:443/api/v1.4/items/145/_metadata'), new MockHttpHandler())
        .subscribe((response) => {
            expect(response).toEqual({} as HttpEvent<any>);
        });

    expect(interceptor.intercept).toBeTruthy();
    const req = httpTestingController.expectNone('https://dms:443/api/v1.4/items/145/_metadata');
  });
});

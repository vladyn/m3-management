import { DmsMetadataInterceptor } from './dms-metadata.interceptor';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { MOCK_METADATA_TRANSFORMED, MOCK_METADATA } from '../../tests/mocks';


describe('DmsTokenInterceptor', () => {
  let interceptor: DmsMetadataInterceptor;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DmsMetadataInterceptor ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(DmsMetadataInterceptor);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create an instance', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept', () => {
    interface MockHttpHandlerInterface extends HttpHandler {
      handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
    }

    class MockHttpHandler implements MockHttpHandlerInterface {
      handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
      return new Observable<HttpEvent<any>>(observer => {
        observer.next(new HttpResponse({ body: MOCK_METADATA }));
        observer.complete();
      });
      }
    }

    interceptor.intercept(new HttpRequest('GET', 'https://dms:443/api/v1.4/items/145/_metadata'), new MockHttpHandler())
        .subscribe((response) => {
            expect(response.body).toEqual(MOCK_METADATA_TRANSFORMED as unknown as HttpEvent<any>);
        });

    interceptor.intercept(new HttpRequest('GET', 'https://dms:443/api/v1.4/items/123/alabala'), new MockHttpHandler())
    .subscribe((response) => {
        expect(response.body).toEqual(MOCK_METADATA as unknown as HttpEvent<any>);
    });

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

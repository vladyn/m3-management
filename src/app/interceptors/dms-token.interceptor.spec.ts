import { DmsTokenInterceptor } from "./dms-token.interceptor";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthDmsService } from "../services/auth-dms.service/auth-dms.service";
import { Observable } from "rxjs";


describe('DmsTokenInterceptor', () => {
  let interceptor: DmsTokenInterceptor;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let dmsService: AuthDmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    dmsService = new AuthDmsService(httpClient);
    interceptor = new DmsTokenInterceptor(dmsService);
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

    interceptor.intercept(new HttpRequest('GET', 'https://dms:443/connect/token?grant_type=client_credentials'), new MockHttpHandler())
        .subscribe((response) => {
            expect(response).toEqual({} as HttpEvent<any>);
        });

    expect(interceptor.intercept).toBeTruthy();
    if (dmsService.isTokenExist()) {
      expect(localStorage.getItem('token_dms')).toEqual('token');
    } else {
      expect(localStorage.getItem('token_dms')).toBeNull();
      const req = httpTestingController.expectOne('https://dms:443/connect/token?grant_type=client_credentials');    
      expect(req.request.method).toEqual('POST');
      expect(req.request.url).toEqual('https://dms:443/connect/token?grant_type=client_credentials');
    }
  });
});
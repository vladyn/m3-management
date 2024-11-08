import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthDmsService } from './auth-dms.service';
import { HttpClient } from '@angular/common/http';

describe('AuthDmsService', () => {
  let service: AuthDmsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(httpTestingController).toBeTruthy();
    expect(httpClient).toBeTruthy();
  });

  it('should get token', () => {
    service = new AuthDmsService(httpClient);
    service.getToken();
    const req = httpTestingController.expectOne('https://dms:443/connect/token?grant_type=client_credentials');
    expect(req.request.method).toEqual('POST');
    req.flush
    ({token : 'token'});
    httpTestingController.verify();
  });
});
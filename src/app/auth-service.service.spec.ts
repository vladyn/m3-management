import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthServiceService } from './auth-service.service';
import { HttpClient } from '@angular/common/http';

describe('AuthServiceService', () => {
  let service: AuthServiceService;
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
    service = new AuthServiceService(httpClient);
    const username = 'username';
    const password = 'password';
    service.getToken(username, password);
    const req = httpTestingController.expectOne('https://niobe3-test.europe-matrix.bg:4222/api/security/authentication/getToken');
    expect(req.request.method).toEqual('POST');
    req.flush
    ({token : 'token'});
    httpTestingController.verify();
  });
});

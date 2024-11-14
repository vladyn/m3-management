import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthDmsService } from './auth-dms.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    spyOn(httpClient, 'get').and.returnValue(new Observable(observer => {
      observer.next({});
      observer.complete();
    }));
  });

  it('should be created', () => {
    expect(httpTestingController).toBeTruthy();
    expect(httpClient).toBeTruthy();
  });

  it('should get token', () => {
    service = new AuthDmsService(httpClient);
    service.getToken();
    if (service.isTokenExist()) {
      expect(localStorage.getItem('token_dms')).toEqual('token');
    } else {
      expect(localStorage.getItem('token_dms')).toBeNull();
      const req = httpTestingController.expectOne('https://dms:443/connect/token?grant_type=client_credentials');
      expect(req.request.method).toEqual('POST');
      req.flush
      ({token : 'token'});
      httpTestingController.verify();
    }
  });

  it('should get Contents', () => {
    service = new AuthDmsService(httpClient);
    service.getContents()
      .subscribe((response) => {
        expect(response).toEqual({});
      });
    expect(httpClient.get).toHaveBeenCalled();
    expect(httpClient.get).toHaveBeenCalledWith('https://dms:443/content/v1.4');
  });

  it('should get Cabinets', () => {
    service = new AuthDmsService(httpClient);
    service.getCabinets()
      .subscribe((response) => {
        expect(response).toEqual({});
      });
    expect(httpClient.get).toHaveBeenCalled();
  });

  it('should get File Metadata', () => {
    service = new AuthDmsService(httpClient);
    service.getFileMetadata()
      .subscribe((response) => {
        expect(response).toEqual({});
      });
    expect(httpClient.get).toHaveBeenCalled();
    expect(httpClient.get).toHaveBeenCalledWith('https://dms:443/api/v1.4/items/145/_metadata');
  });

  it('should get File Blob', () => {
    service = new AuthDmsService(httpClient);
    service.getFileBlob()
      .subscribe((response) => {
        expect(response).toEqual( {} as Blob );
      });
    expect(httpClient.get).toHaveBeenCalled();
  });
});
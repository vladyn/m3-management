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
    service.getToken().subscribe((response) => {
      expect(response).toEqual('');
    });
  });

  it('should get File Metadata', () => {
    service = new AuthDmsService(httpClient);
    service.getFileMetadata(145)
      .subscribe((response) => {
        expect(response).toEqual({});
      });
    expect(httpClient.get).toHaveBeenCalled();
    expect(httpClient.get).toHaveBeenCalledWith('https://dms:443/api/v1.4/items/145/_metadata');
  });

  it('should get File Blob', () => {
    service = new AuthDmsService(httpClient);
    service.getFileBlob('uniformName', 'path')
      .subscribe((response) => {
        expect(response).toEqual( {} as Blob );
      });
    expect(httpClient.get).toHaveBeenCalled();
  });
});

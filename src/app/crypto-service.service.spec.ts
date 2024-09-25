import { TestBed } from '@angular/core/testing';
import { CryptoServiceService } from './crypto-service.service';

describe('CryptoServiceService', () => {
  let service: CryptoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should encrypt data', () => {
    const data = 'data';
    const encryptedData = service.encryptData(data);
    console.log(encryptedData);
    expect(encryptedData).toBeTruthy();
  });

  it('should decrypt data', () => {
    const data = 'data';
    const encryptedData = service.encryptData(data);
    const decryptedData = service.decryptData(encryptedData);
    expect(decryptedData).toBe(data);
  });
});

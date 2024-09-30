import { TestBed } from '@angular/core/testing';
import { CryptoServiceService } from './crypto-service.service';
import { DEFAULT_ENCRYPT_KEY as key } from '../enums';

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
    const encryptedData = service.encryptData(data, key);
    console.log(encryptedData);
    expect(encryptedData).toBeTruthy();
  });

  // it('should decrypt data', () => {
  //   const data = 'data';
  //   const encryptedData = service.encryptData(data, key);
  //   const decryptedData = service.decryptData(encryptedData, key);
  //   expect(decryptedData).toBe(data);
  // });
});

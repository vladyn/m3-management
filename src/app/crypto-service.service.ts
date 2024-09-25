import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoServiceService {
  private key = 'encrypt!ablala';

  public encryptData(data: string) {
    try {
      return CryptoJS.AES.encrypt(data, this.key).toString();
    } catch (e) {
      throw new Error(`Error while encrypting: ${e}`);
    }
  }

  public decryptData(data: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.key);
      if (bytes.toString()) {
        return bytes.toString(CryptoJS.enc.Utf8);
      }
      return bytes;
    } catch (e) {
      throw new Error(`Error while decrypting: ${e}`);
    }
  }
}

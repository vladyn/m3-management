import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoServiceService {
  private iv = CryptoJS.lib.WordArray.random(128 / 8);

  public encryptData(data: string, client_id: string) {
    const key = CryptoJS.PBKDF2(data, this.iv, {
      keySize: 256 / 32,
      iterations: 10000,
      hasher: CryptoJS.algo.SHA1,
    });

    try {
      var encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(client_id),
        key,
        {
          iv: this.iv,
          padding: CryptoJS.pad.ZeroPadding,
          mode: CryptoJS.mode.CBC,
        }
      );
      return CryptoJS.enc.Base64.stringify(
        this.iv.concat(encrypted.ciphertext)
      );
    } catch (e) {
      throw new Error(`Error while encrypting: ${e}`);
    }
  }
}

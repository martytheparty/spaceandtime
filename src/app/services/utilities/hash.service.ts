import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor() { }

  async getHashString(value: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert buffer to hex string
    return Array.from(new Uint8Array(hashBuffer))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }
}

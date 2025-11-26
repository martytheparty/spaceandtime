import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WViewPortService {

  constructor() {}

  getViewPortHeight(): number{
    return window.innerHeight; 
  }

  getViewPortWidth(): number{
      return window.innerWidth; 
  }
}

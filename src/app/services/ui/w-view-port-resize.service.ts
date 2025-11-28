import { Injectable, signal, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WViewPortResizeService implements OnDestroy {

// Holds the current viewport width/height
  readonly viewport = signal({
    width: window.innerWidth,
    height: window.innerHeight
  });


  // Use a class property arrow function so `this` is preserved and we have a stable reference
  private onResize = () => {
    this.viewport.set({
      width: window.innerWidth,
      height: window.innerHeight
    });
    return true;
  };

  constructor() { 
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }


}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DebounceService {
  private timers = new Map<string, ReturnType<typeof setTimeout>>();

  debounce(
    key: string,
    callback: () => void,
    delay = 300
  ): void {
    const existing = this.timers.get(key);
    if (existing) {
      clearTimeout(existing);
    }

    const timer = setTimeout(() => {
      callback();
      this.timers.delete(key);
    }, delay);

    this.timers.set(key, timer);
  }

  cancel(key: string): boolean {
    let found = false;
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
      found = true;
    }

    return found;
  }

}

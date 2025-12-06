import { Injectable } from '@angular/core';
import { SequenceDictionary } from '../../../interfaces/base/dictionary/base-dicts';

@Injectable({
  providedIn: 'root'
})
export class RecyclableSequenceService {
  private sequenceDictionary: SequenceDictionary = {};

  generateId(): number {
    let nextId = 1;

    while(this.sequenceDictionary.hasOwnProperty(nextId)) {
      nextId++;
    }

    this.sequenceDictionary[nextId] = null;

    console.table(this.sequenceDictionary);

    return nextId;
  }

  recycleId(id: number): void {
    delete this.sequenceDictionary[id];
  }
}

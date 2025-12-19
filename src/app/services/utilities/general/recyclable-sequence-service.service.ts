import { Injectable } from '@angular/core';
import { SeqenceStTypes, SequenceDictionary } from '../../../interfaces/base/dictionary/base-dicts';

@Injectable({
  providedIn: 'root'
})
export class RecyclableSequenceService {
  private sequenceDictionary: SequenceDictionary = {};

  generateStId(): number {
    let nextId = 1;

    while(this.sequenceDictionary.hasOwnProperty(nextId)) {
      nextId++;
    }

    this.sequenceDictionary[nextId] = null;

    this.logSequenceDictionary();

    return nextId;
  }

  associateStObjectToId(stId: number, stType: SeqenceStTypes ): boolean {
    return this.setTypeForStId(this.sequenceDictionary, stId, stType);
  }

  private setTypeForStId(sequenceDictionary: SequenceDictionary, stId: number, stType: SeqenceStTypes): boolean {
    let updated = false;

    if (sequenceDictionary.hasOwnProperty(stId)) {
      updated = true;
      sequenceDictionary[stId] = stType;
    }

    return updated;
  }

  recycleId(id: number): void {
    delete this.sequenceDictionary[id];
  }

  logSequenceDictionary(): boolean
  {
    let drew = true;

    console.log(this.sequenceDictionary);

    return drew;
  }
}

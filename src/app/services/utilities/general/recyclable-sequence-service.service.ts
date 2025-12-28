import { Injectable, inject } from '@angular/core';
import { SeqenceStTypes, SequenceDictionary } from '../../../interfaces/base/dictionary/base-dicts';
import { DebounceService } from '../timing/debounce.service';

@Injectable({
  providedIn: 'root'
})
export class RecyclableSequenceService {

  debounceService: DebounceService = inject(DebounceService);

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
    let registered = true;
    const debounceTime = 100;

    this.debounceService.debounce(
      "sequence-log",
      this.printSequenceDictionary.bind(this),
      debounceTime
    );

    return registered;
  }

  printSequenceDictionary(): boolean
  {
    let printed = true;

    console.log(this.sequenceDictionary);

    return printed;
  }
}

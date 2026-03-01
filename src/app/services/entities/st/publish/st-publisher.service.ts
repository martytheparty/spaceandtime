import { Injectable, signal, inject } from '@angular/core';
import { CalculatedAspectRatioDict } from '../../../../interfaces/st';
import { SequenceDictionary } from '../../../../interfaces/base/dictionary/base-dicts';
import { HashService } from '../../../utilities/general/hash.service';

@Injectable({
  providedIn: 'root'
})
export class StPublisherService {

  private hashService: HashService = inject(HashService);

  private calculatedArDictionary: CalculatedAspectRatioDict = {};

  calculatedAspectRatioSignal = signal<CalculatedAspectRatioDict>(this.calculatedArDictionary);
  visualizationIds = signal<SequenceDictionary>({});
  visualizationIdsHash = signal<string>("");


  constructor() { }

  setCalculatedAspectRatio(stRendererId: number, aspectRatio: number): CalculatedAspectRatioDict {
    // make a new shallow copy of the arDictionary
    const dictionary: CalculatedAspectRatioDict = { ...this.calculatedArDictionary };
    
    // modify the dictionary
    dictionary[stRendererId] = aspectRatio;

    // publish the new dictionary
    this.calculatedAspectRatioSignal.set(dictionary);
    
    // save the new dictiona
    this.calculatedArDictionary = dictionary;

    return dictionary;
  }

  setVisualizationIds(sequenceDictionary: SequenceDictionary): boolean
  {
    this.visualizationIds.set(sequenceDictionary);
    this.setVisualizationHash(sequenceDictionary);
    return true;
  }

  setVisualizationHash(sequenceDictionary: SequenceDictionary): boolean
  {
    const sdJson = JSON.stringify(sequenceDictionary);
    const hashPromise = this.hashService.getHashString(sdJson);
    let hash = "";
    
    hashPromise.then( (result: string) => {
      hash = result;

      // publish new hash value
      this.visualizationIdsHash.set(hash);
    } );

    return true;
  }
}

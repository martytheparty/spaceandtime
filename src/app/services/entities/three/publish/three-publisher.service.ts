import { Injectable, signal } from '@angular/core';
import { ThreeAspectRatioDict } from '../../../../interfaces/three/dictionaries/three-aspect-ratio-dict';


@Injectable({
  providedIn: 'root'
})
export class ThreePublisherService {

  private threeArDictionary: ThreeAspectRatioDict = {};

  threeAspectRatioSignal = signal<ThreeAspectRatioDict>(this.threeArDictionary);

  constructor() { }

  setThreeAspectRatioForStRenderId(stRendererId: number, aspectRatio: number): ThreeAspectRatioDict {
    // make a new SHALLOW copy of the threeArDictionary
    const dictionary: ThreeAspectRatioDict = { ...this.threeArDictionary };
    
    // modify the dictionary
    dictionary[stRendererId] = aspectRatio;

    // publish the new dictionary
    this.threeAspectRatioSignal.set(dictionary);
    
    // save the new dictionary
    this.threeArDictionary = dictionary;

    return dictionary;
  }
}
  

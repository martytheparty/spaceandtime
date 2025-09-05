import { Injectable, signal } from '@angular/core';
import { CalculatedAspectRatioDict } from '../../../interfaces/st';

@Injectable({
  providedIn: 'root'
})
export class StPublisherService {

  private calculatedArDictionary: CalculatedAspectRatioDict = {};

  calculatedAspectRatioSignal = signal<CalculatedAspectRatioDict>(this.calculatedArDictionary);

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
}

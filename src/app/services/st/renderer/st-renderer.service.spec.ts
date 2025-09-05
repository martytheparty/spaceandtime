import { TestBed } from '@angular/core/testing';

import { StRendererService } from './st-renderer.service';
import { CalculatedValues, StRenderer } from '../../../interfaces/st';
import { Component } from '@angular/core';

describe('StRendererService', () => {
  let service: StRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StRendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a renderer by id', () => {
    const stId: number = service.getBaseStRenderer();
    const stRenderer: StRenderer = service.getRendererById(stId);

    expect(stId).toEqual(stRenderer.stRendererId);
  });


  it('should renderer by id', () => {
    const stId: number = service.getBaseStRenderer();
    const stRenderer: StRenderer = service.getRendererById(stId);

    const mockDiv = {
      offsetWidth: 800,
      offsetHeight: 600
    } as unknown as HTMLDivElement;

    service.renderById(stId, mockDiv);

    expect(stId).toEqual(stRenderer.stRendererId);
  });

  it('should delete an id', () => {
    let deleteResult = service.deleteRenderer(1);
    expect(deleteResult).toBeFalse();

    const stId: number = service.getBaseStRenderer();
    deleteResult = service.deleteRenderer(stId);
    expect(deleteResult).toBeTrue();
  });

  it('should set the calculated aspect ratio', () => {
    let calculated: CalculatedValues = { aspectRatio: 0 };

    expect(calculated.aspectRatio).toEqual(0);

    calculated = service.getCalculatedValuesObjectForCalculatedArChange(calculated, 1);

    expect(calculated.aspectRatio).toEqual(1);

  });
});

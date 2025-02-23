import { TestBed } from '@angular/core/testing';

import { RendererService } from './renderer.service';
import { RecyclableSequenceService } from '../../utilities/recyclable-sequence-service.service';

describe('RendererService', () => {
  let service: RendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a numeric id', () => {
    const rendererId = service.createRenderer(1);
    expect(!isNaN(Number(rendererId))).toBeTrue()
  })

  it('should return an object for a rendererId', () => {
    const rendererId = service.createRenderer(1);
    const renderer = service.getRendererById(rendererId);
    expect(renderer).toBeTruthy()
  })

});

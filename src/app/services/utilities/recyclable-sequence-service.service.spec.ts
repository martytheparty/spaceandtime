import { TestBed } from '@angular/core/testing';

import { RecyclableSequenceService } from './recyclable-sequence-service.service';

describe('RecyclableSequenceServiceService', () => {
  let service: RecyclableSequenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecyclableSequenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate an id', () => {
    const id1 = service.generateId();
    const id2 = service.generateId();
    expect(id1).toBeGreaterThan(0);
    expect(id2).not.toEqual(id1);
  })

  it('should recycle an id', () => {

    const id1 = service.generateId();

    expect(id1).toBeGreaterThan(0);

    service.recycleId(id1);

    const id2 = service.generateId();

    expect(id2).toEqual(id1);
  })

});

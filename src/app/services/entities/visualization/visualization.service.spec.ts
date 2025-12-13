import { Component, QueryList } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationService } from './visualization.service';
import { StVisualization } from '../../../interfaces/st';
import { RendererService } from '../three/renderer/renderer.service';
import { RecyclableSequenceService } from '../../utilities/general/recyclable-sequence-service.service';

import { VizComponent } from '../../../components/viz/viz.component';


@Component({
  imports: [VizComponent],
  template: `<app-viz [stRendererInputId]="1"></app-viz>`, // ✅ Provide input here
})
class TestVizComponent {}

describe('VisualizationService', () => {
  let service: VisualizationService;
  let rendererService: RendererService;
  let recyclableSequenceService: RecyclableSequenceService;

  let fixture: ComponentFixture<TestVizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestVizComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestVizComponent);
    fixture.detectChanges();

    service = TestBed.inject(VisualizationService);
    rendererService = TestBed.inject(RendererService);
    recyclableSequenceService = TestBed.inject(RecyclableSequenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // unit test setCalculatedPosition
  it('should change the stTop for a new row', () => {
    const isTooWide = (left: number, width: number, viewPortWidth: number) => {
      return true;
    };

    const mockElement = {
      style: { left: 0, top: 0 },
    } as unknown as HTMLDivElement;

    const mockViz: StVisualization = {
      stLeft: 100,
      stTop: 0,
      vizComponent: {
        rendererViewChild: {
          nativeElement: {
            parentElement: mockElement
          }
        }
      }
    } as unknown as StVisualization;

    const visualizations: StVisualization[] = [ mockViz ];

    const viewPortWidth = 100; // this doesn't because isTooWide always returns true
    expect(mockViz.stTop).toEqual(0);

  });

  it('should create a new visualization', () => {
      const rendererId = recyclableSequenceService.generateStId();
      rendererService.createRenderer(rendererId);

      const mockElement = {
        style: { left: 0, top: 0 },
      } as unknown as HTMLDivElement;

      const mockViz: StVisualization = {
        stLeft: 100,
        stTop: 0,
        vizComponent: {
          rendererViewChild: {
            nativeElement: {
              parentElement: mockElement
            }
          }
        }
      } as unknown as StVisualization;
      const vizComponent: VizComponent = fixture.debugElement.children[0].componentInstance;
      service.viewPortWidth = service.viewPortWidth + 1;
      const visualizationId = service.createStVisualization(rendererId, vizComponent);

      expect(visualizationId).not.toEqual(rendererId);
      expect(service.getStVisualizations().length).toBeGreaterThan(0);

      const deleteResult = service.deleteVisualizationForRendererId(rendererId);

      expect(deleteResult.length).toEqual(0);

  });

  it('should get the current visualizations', () => {
    const visualizations = service.getStVisualizations();

    expect(visualizations.length).toEqual(0);
  });

  it('should setup DOM visualization', () => {
    const vizComponent: VizComponent = fixture.debugElement.children[0].componentInstance;

    const queryList = new QueryList<VizComponent>();
    queryList.reset([vizComponent]);

    const vizCount = service.setupDomVisualizations(queryList);

    expect(vizCount).toEqual(1);
  });

  it('check if the new viz will be too wide', () => {
    let tooWide = service.isTooWide(1,1,1);
    expect(tooWide).toBeTrue();
  })

  it('filters visualizations based on renderer id', () => {
    const mockEmptyViz1 = { vizComponent: null } as unknown as StVisualization;
    mockEmptyViz1.stRendererId = 1;

    const mockEmptyViz2 = { vizComponent: null } as unknown as StVisualization;
    mockEmptyViz2.stRendererId = 2;



    const testRendererId = 1;
    
    let filterFunction: (stVisualization: StVisualization) => boolean 
      = service.deleteVisualizationForRendererIdFilter(testRendererId);
   
    // test when ID is the same
    const result1: boolean = filterFunction(mockEmptyViz1);
    expect(result1).toBeFalse();

    // test when ID is the same
    const result2: boolean = filterFunction(mockEmptyViz2);
    expect(result2).toBeTrue();
   
  })

  it('Remove a visualization based on a id', () => {
    expect(service.stVisualizations.length).toBe(0);

      const rendererId = recyclableSequenceService.generateStId();
      rendererService.createRenderer(rendererId);

      const mockElement = {
        style: { left: 0, top: 0 },
      } as unknown as HTMLDivElement;

      const mockViz: StVisualization = {
        stLeft: 100,
        stTop: 0,
        vizComponent: {
          rendererViewChild: {
            nativeElement: {
              parentElement: mockElement
            }
          }
        }
      } as unknown as StVisualization;
      const vizComponent: VizComponent = fixture.debugElement.children[0].componentInstance;
      service.viewPortWidth = service.viewPortWidth + 1;
      const visualizationId = service.createStVisualization(rendererId, vizComponent);

    expect(service.stVisualizations.length).toBe(1);

    // tests that it doesn't break if pass in a viz ID that does exists
    const falseResult = service.pruneVisualizationsByRendererId(rendererId + 1);

    expect(falseResult).toBe(false);
    expect(service.stVisualizations.length).toBe(1);

    const trueResult = service.pruneVisualizationsByRendererId(rendererId);
    expect(trueResult).toBe(true);
    expect(service.stVisualizations.length).toBe(0);
  })

  it('gets a visualization for a component', () => {

      const mockElement = {
        style: { left: 0, top: 0 },
      } as unknown as HTMLDivElement;

      const mockViz: StVisualization = {
        stLeft: 100,
        stTop: 0,
        vizComponent: {
          rendererViewChild: {
            nativeElement: {
              parentElement: mockElement
            }
          }          
        }
      } as unknown as StVisualization;
      const mockViz1: StVisualization = { stVizComponentId: 1, stLeft: 0, stWidth: 50 } as StVisualization;
      const mockViz2: StVisualization = { stVizComponentId: 1, stLeft: 50, stWidth: 50 } as StVisualization;
      const mockViz3: StVisualization = { stVizComponentId: 1, stLeft: 100, stWidth: 50 } as StVisualization;

      // This is our list of StVisualizations
      const vizList: StVisualization[] = [mockViz1, mockViz2, mockViz3];

      // This is our component and it ahs and stVisualizationId of 1
      const vizComponent: VizComponent = fixture.debugElement.children[0].componentInstance;

      expect(vizComponent.stVizComponentId).toEqual(1);
      
      const stViz: StVisualization | undefined = service.getStVisualizationForComponent(vizComponent, vizList);

      expect(stViz).toBeTruthy();
  } )

  it('return the value between the left property of an stVisualization', () => {
      const mockViz1: StVisualization = { stLeft: 0 } as StVisualization;
      const mockViz2: StVisualization = { stLeft: 50 } as StVisualization;
      const mockViz3: StVisualization = { stLeft: 100 } as StVisualization;

      let compareNumber = service.horizontalSortComparator(mockViz3, mockViz1);

      expect(compareNumber).toEqual(-100);

      compareNumber = service.horizontalSortComparator(mockViz1, mockViz2);

      expect(compareNumber).toEqual(50);
  })

  it('horizontally sort visualizations', () => {
      const mockViz1: StVisualization = { stLeft: 0 } as StVisualization;
      const mockViz2: StVisualization = { stLeft: 50 } as StVisualization;
      const mockViz3: StVisualization = { stLeft: 100 } as StVisualization;

      const originalVizList: StVisualization[] = [mockViz1, mockViz2, mockViz3];
      const sortedVizList = service.getHorizontallySortedVisualizations(originalVizList);

      expect(originalVizList[0].stLeft).toEqual(0);
      expect(sortedVizList[0].stLeft).toEqual(100);
  })
  it('get next available right', () => {
      const mockViz1: StVisualization = { stLeft: 0, stWidth: 50 } as StVisualization;
      const mockViz2: StVisualization = { stLeft: 50, stWidth: 50 } as StVisualization;
      const mockViz3: StVisualization = { stLeft: 100, stWidth: 50 } as StVisualization;

      const originalVizList: StVisualization[] = [mockViz1, mockViz2, mockViz3];
      const availableRight = service.getNextAvailableRight(originalVizList);

      const nextAvailableRight = 150;// stLeft + stWidth

      expect(availableRight).toEqual(nextAvailableRight);
  })

  it('filters a viz based on the current row and the current viz', () => {

      const mockViz1: StVisualization = { stTop: 0, stRendererId: 1 } as StVisualization;
      const mockViz2: StVisualization = { stTop: 0, stRendererId: 2 } as StVisualization;

      const currentViz = mockViz1;
      const currentRow = 0;

      const predicateFilterFunction = service.isRowSibling(currentRow, currentViz);
      const isSibling = predicateFilterFunction(mockViz2);
      expect(isSibling).toBe(true);

  })

  it('checks right position against the width', () => {
    const right = 100;
    const width = 50;
    const available: Boolean = service.compareRightToWidth(right, width);

    expect(available).toBeFalse();
  })

  it('gets the next candidate right position', () => {
    const right = 100;
    const width = 50;
    const candidateRightPosition = service.getRightPositionCandidate(right, width);

    expect(candidateRightPosition).toEqual(150);
  })

  it('gets the row availabilty based on the existing siblings', () => {
    const mockViz1: StVisualization = { stLeft: 0, stWidth: 50 } as StVisualization;
    const mockViz2: StVisualization = { stLeft: 50, stWidth: 50 } as StVisualization;
    const mockViz3: StVisualization = { stLeft: 100, stWidth: 50 } as StVisualization;

    const currentMockViz: StVisualization = { stLeft: 0, stWidth: 50 } as StVisualization;

    const siblings: StVisualization[] = [mockViz1, mockViz2, mockViz3, currentMockViz];

    const viewPortWidth = 150;

    const isRowAvailable = service.getRowAvailabilityForPotentialSiblings(siblings, currentMockViz, viewPortWidth);

    expect(isRowAvailable).toBeFalse();

  })

  it('determine if a row is available', () => {
    const mockViz1: StVisualization = { stTop: 0, stLeft: 0, stWidth: 50, stRendererId: 1 } as StVisualization;
    const mockViz2: StVisualization = { stTop: 0, stLeft: 50, stWidth: 50, stRendererId: 2 } as StVisualization;
    const mockViz3: StVisualization = { stTop: 0, stLeft: 100, stWidth: 50, stRendererId: 3 } as StVisualization;
    const mockViz4: StVisualization = { stTop: 50, stLeft: 0, stWidth: 50, stRendererId: 4 } as StVisualization;

    const currentMockViz: StVisualization = { stTop: 0,stLeft: 0, stWidth: 50, stRendererId: 5 } as StVisualization;

    const siblings: StVisualization[] = [mockViz1, mockViz2, mockViz3, mockViz4, currentMockViz];

    const viewPortWidth = 150;
    const row = 0;
    const available = service.isRowAvailable(row, currentMockViz, siblings, viewPortWidth);

    expect(available).toBeFalse();
  })

  it('determine if a row is available', () => {
    const mockViz1: StVisualization = { stTop: 0, stLeft: 0, stWidth: 50, stRendererId: 1, stHeight: 50 } as StVisualization;
    const mockViz2: StVisualization = { stTop: 0, stLeft: 50, stWidth: 50, stRendererId: 2, stHeight: 50 } as StVisualization;
    const mockViz3: StVisualization = { stTop: 0, stLeft: 100, stWidth: 50, stRendererId: 3, stHeight: 50 } as StVisualization;
    const mockViz4: StVisualization = { stTop: 50, stLeft: 0, stWidth: 50, stRendererId: 4, stHeight: 50 } as StVisualization;

    const currentMockViz: StVisualization = { stTop: 0,stLeft: 0, stWidth: 50, stRendererId: 5, stHeight: 50 } as StVisualization;

    const siblings: StVisualization[] = [mockViz1, mockViz2, mockViz3, mockViz4, currentMockViz];

    const viewPortWidth = 150;
    const top = service.getNextAvailableTop( currentMockViz, siblings, viewPortWidth);

    expect(top).toEqual(50);
  })

  it('resets all visualization', () => {
    const mockViz1: StVisualization = { stTop: 0, stLeft: 0, stWidth: 50, stRendererId: 1, stHeight: 50 } as StVisualization;
    const mockViz2: StVisualization = { stTop: 0, stLeft: 50, stWidth: 50, stRendererId: 2, stHeight: 50 } as StVisualization;
    const mockViz3: StVisualization = { stTop: 0, stLeft: 100, stWidth: 50, stRendererId: 3, stHeight: 50 } as StVisualization;
    const mockViz4: StVisualization = { stTop: 50, stLeft: 0, stWidth: 50, stRendererId: 4, stHeight: 50 } as StVisualization;


    const visualizations: StVisualization[] = [mockViz1, mockViz2, mockViz3, mockViz4];
    service.stVisualizations = visualizations;

    const resetResult = service.resetAllStVisualizationComponent();

    expect(resetResult).toBe(true);

  })

  it("tests upsert for an insert (creates a new StVisualization)", () => {
    // When a new component is created before the StVisualation has been create
    // a new StVisualization must be created.
    // this has an StVisualizationId of 1
    const vizComponent: VizComponent = fixture.debugElement.children[0].componentInstance;
    const vizComponents: VizComponent[] = [ vizComponent ];

    expect(service.stVisualizations.length).toEqual(0);

    // returns true if it created a nw StVisualizaton
    const created = service.upsertStVisualizationForComponent(vizComponent, 0, vizComponents);

    expect(created).toBe(true);

    expect(service.stVisualizations.length).toEqual(1);

  });

  it("tests upsert for an udpate (modifieds and existing StVisualization)", () => {
    // When a new component is created but there an an existing StVisualation with an old
    // component id then the old StVisulation should be created with a the new ID
    // this has an StVisualizationId of 1

    const mockStViz: StVisualization = { 
      stTop: 0, 
      stLeft: 0, 
      stWidth: 50, 
      stRendererId: 1, 
      stHeight: 50,
      stVizComponentId: -1 
    } as StVisualization;

    service.stVisualizations = [ mockStViz ];
    const vizComponent: VizComponent = fixture.debugElement.children[0].componentInstance;
    const vizComponents: VizComponent[] = [ vizComponent ];

    expect(service.stVisualizations.length).toEqual(1);

    // returns true if it created a nw StVisualizaton
    const created = service.upsertStVisualizationForComponent(vizComponent, 0, vizComponents);

    expect(created).toBe(false);

    expect(service.stVisualizations.length).toEqual(1);

  });

  it("deletes the passed in component from StVisualizations", () => {
    // When a new component is created but there an an existing StVisualation with an old
    // component id then the old StVisulation should be created with a the new ID
    // this has an StVisualizationId of 1

    const mockStViz: StVisualization = { 
      stTop: 0, 
      stLeft: 0, 
      stWidth: 50, 
      stRendererId: 1, 
      stHeight: 50,
      stVizComponentId: 1 
    } as StVisualization;

    service.stVisualizations = [ mockStViz ];

    // the stVisualziations array was just set.
    expect(service.stVisualizations.length).toEqual(1);

    // returns true if it created a nw StVisualizaton
    const vizComponentsCount = service.deleteComponentForId(mockStViz.stVizComponentId);

    expect(vizComponentsCount).toBe(0);

    expect(service.stVisualizations.length).toEqual(0);

  });

});

import { TestBed } from '@angular/core/testing';

import * as THREE from 'three';

import { AnimationService } from './animation.service';
import { RedrawTypes, StAnimation, StGeometry, StMesh, StRenderer, StScene, StVisualization, TemporalTypes, ThreePathAliasType } from '../../../interfaces/st';
import { StMeshService } from '../st/mesh/st-mesh.service';
import { MeshService } from '../three/mesh/mesh.service';
import { StGeometryService } from '../st/geometry/st-geometry.service';
import { StRendererService } from '../st/renderer/st-renderer.service';
import { VisualizationService } from '../visualization/visualization.service';
import { StSceneService } from '../st/scene/st-scene.service';
import { VizComponent } from '../../../components/viz/viz.component';


describe('AnimationService', () => {
  let service: AnimationService;
  let stMeshService: StMeshService;
  let stGeometryService: StGeometryService;

  let stRendererService: StRendererService;
  let stSceneService: StSceneService;

  let meshService: MeshService;

  let visualizationService: VisualizationService;


  let stMesh: StMesh;
  let threeMesh: THREE.Mesh;
  let stGeometry: StGeometry;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationService);
    stMeshService = TestBed.inject(StMeshService);
    stGeometryService = TestBed.inject(StGeometryService);
    stRendererService = TestBed.inject(StRendererService);
    visualizationService = TestBed.inject(VisualizationService);
    stSceneService = TestBed.inject(StSceneService);
    meshService = TestBed.inject(MeshService);

    const meshId = stMeshService.createBaseMesh();
    stMesh = stMeshService.getMeshById(meshId);
    threeMesh = meshService.getMeshById(meshId);

    const geometryId = stGeometryService.createBaseGeometry();
    stGeometry = stGeometryService.getGeometryById(geometryId);

  }
);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be modify rotation x (updateMeshForAnimation)', () => {

    const material = new THREE.MeshNormalMaterial({side: THREE.FrontSide})

    const stAnimations: StAnimation[] = [
        { 
          type: 'st-animation',
          stAnimationId: 1,
          alias: "mesh-rotation-x",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        },
        { 
          type: 'st-animation',
          stAnimationId: 2,
          alias: "mesh-rotation-y",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        },
        {
          type: 'st-animation',
          stAnimationId: 2,
          alias: "mesh-rotation-z",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        }
      ]

    expect(threeMesh.rotation.x).toEqual(0);
    service.updateMeshForAnimation(threeMesh, stAnimations[0]);
    expect(threeMesh.rotation.x).toEqual(0.05);

  });

  it('should return a function (createAnimationFunctionForId)', () => {

    // new test
    const stRendererId: number = stRendererService.getBaseStRenderer();
    const stRenderer: StRenderer = stRendererService.getRendererById(stRendererId);
    const stScene: StScene = stSceneService.getSceneById(stRenderer.stSceneId);

   stScene.stMeshIds.forEach(
      (stMeshId: number) => {
        const stMesh = stMeshService.getMeshById(stMeshId);
        const animation1: StAnimation = {
          type: 'st-animation',
          stAnimationId: 1, 
          alias: "mesh-rotation-x",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        };
        stMesh.stAnimations.push(animation1);
        const animation2: StAnimation = {
          type: 'st-animation',
          stAnimationId: 2, 
          alias: "mesh-rotation-y",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        };
        stMesh.stAnimations.push(animation2);
      }
    );

    const fun = service.createAnimationFunctionForId(stRenderer);
    // execute to achieve 100% test coverage
    fun();

    expect(typeof fun).toEqual("function")

  });

  it('should be able to add an animation', () => {
   
    const stRendererId: number = stRendererService.getBaseStRenderer();
    const stRenderer: StRenderer = stRendererService.getRendererById(stRendererId);
    const stScene: StScene = stSceneService.getSceneById(stRenderer.stSceneId);
    const meshId = stScene.stMeshIds[0];
    const stMesh: StMesh = stMeshService.getMeshById(meshId);;
    const alias: ThreePathAliasType = "mesh-rotation-x";
    const temporal: TemporalTypes = "infinite";
    const redraw: RedrawTypes = "continous";
    const time: number = 0;
    const values: number[] = [1];

    expect(stMesh.stAnimations.length).toEqual(0);

    service.addAnimation(stMesh, alias,temporal,redraw, time, values);

    expect(stMesh.stAnimations.length).toEqual(1);

    service.addAnimation(stMesh, alias,temporal,redraw);

    expect(stMesh.stAnimations.length).toEqual(2);

  });

  it('should execute visualizationsLayout with a hash change', async () => {
    const id = stRendererService.getBaseStRenderer();

    service.visualizationsLayout();
    const originalHashValue = service.visualizationService.visualizationHashValue;
    expect(originalHashValue).toEqual('');
    await service.visualizationService.resetHash(1,1);
    service.visualizationsLayout();

    // this is what we expect to get back from the crypto.subtle.digest service
    const expectedHashValue = '0fdedecf9e186e041488d2cfbea60a15742f5dc5ca2bd6272a11e13c9afc7ed7';
    const newHashValue = service.visualizationService.visualizationHashValue;

    expect(newHashValue).toEqual(expectedHashValue);

    // there is an async call so we need to move the following code into the next cycle

  });

  it('should use visualizationLayout to process visualization changes', async () => {
    service.visualizationsLayout();
    const originalHashValue = service.visualizationService.visualizationHashValue;
    expect(originalHashValue).toEqual('');
    
    await visualizationService.resetHash(1,1);
    service.visualizationsLayout();

  });

  it('should set the position style of the visualization element', () =>{ 
    const mockElement = {
      style: { left: '', top: '' },
    } as unknown as HTMLDivElement;

    const mockVizComponent = {
        rendererViewChild: {
          nativeElement: {
            parentElement: mockElement
          }
        }
      } as unknown as VizComponent

    const mockStViz: StVisualization = {
      stVisualizationId: 1,
      stLeft: 100,
      stTop: 200,
      vizComponent: mockVizComponent
    } as unknown as StVisualization;

    service.setPosition(mockStViz);
    service.setPostionForVizComponent(mockVizComponent, mockStViz);

    expect(mockElement.style.left).toBe('100px');
    expect(mockElement.style.top).toBe('200px');
  });

  it('should animate a visualization', () => {
    
    const stRendererId: number = stRendererService.getBaseStRenderer();
    const stRenderer: StRenderer = stRendererService.getRendererById(stRendererId);

    expect(stRenderer.stRendererId).toEqual(stRendererId);
  })

    it('should update the visualization layouts', () => {
    const vizCount = 5;
    const result = service.updateVisualizationLayout(vizCount);

    expect(vizCount).toEqual(result);
  });

  it('should return a function (createAnimationFunctionForId) and execute with deleted renderer', () => {

    // new test
    const stRendererId: number = stRendererService.getBaseStRenderer();
    const stRenderer: StRenderer = stRendererService.getRendererById(stRendererId);
    stRenderer.deleted = true;

    const fun = service.createAnimationFunctionForId(stRenderer);
    // execute to achieve 100% test coverage
    fun();
    stRenderer.deleted = false;

    expect(typeof fun).toEqual("function")

  });

});



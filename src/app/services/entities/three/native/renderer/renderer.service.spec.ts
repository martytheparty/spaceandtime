import { TestBed } from '@angular/core/testing';

import { RendererService } from './renderer.service';

import * as THREE from 'three';

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

  it('should render a threeJS renderer', () => {
    const rendererId = 1;
    service.createRenderer(rendererId);

    const scene: THREE.Scene = new THREE.Scene();
    const persprectiveCamera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();

    service.renderRenderer(rendererId, scene, persprectiveCamera);

    const renderer = service.getRendererById(rendererId);

    expect(renderer).toBeTruthy();
  });

  it('should set the animation function of the renderer', () => {
    const rendererId = 1;
    service.createRenderer(rendererId);
    
    const mockFunction = () => {};
    
    service.setAnimationFunctionForStId(rendererId, mockFunction);

    const renderer = service.getRendererById(rendererId);

    expect(renderer).toBeTruthy();
  });

});

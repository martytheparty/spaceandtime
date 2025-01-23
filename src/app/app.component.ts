import { Component, inject } from '@angular/core';
import * as THREE from 'three';
import { RendererService } from './services/three/renderer.service';
import { StAnimation, StCamera, StRenderer, StScene } from './interfaces/st';
import { AnimationService } from './services/three/animation.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  rendererService: RendererService = inject(RendererService);
  animationService: AnimationService = inject(AnimationService);

  title = 'Space & Time';
  width = window.innerWidth;
  height = window.innerHeight;

  stCamera: StCamera = {
    stAspectRatio: this.width/this.height,
    stFrustrum: 50,
    stNear: .01,
    stFar: 100,
    stPosition: {
      stX: 0,
      stY: 0,
      stZ: 7
    },
    stLookat: {
      stX: 0,
      stY: -1,
      stZ: 0
    }
  };

  stScene: StScene = {
    stMeshes: [
      {
        stPosition: {
          stX: 0,
          stY: 0,
          stZ: -3
        },
        stRotation: {
          stX: 0,
          stY: 0,
          stZ: 0
        },
        stGeometry: { 
          stWidth: .75,
          stHeight: .5,
          stDepth: 3,
          stType: 'box'
        },
        stMaterial: {
          stType: 'normal',
          stSide: THREE.DoubleSide
        },
        stAnimations: [
          { 
            alias: "mesh-rotation-x",
            temporal: 'infinite',
            redraw: 'continous',
            time: 0,
            values: [.05]
          },
          { 
            alias: "mesh-rotation-y",
            temporal: 'infinite',
            redraw: 'continous',
            time: 0,
            values: [.05]
          },
          { 
            alias: "mesh-rotation-z",
            temporal: 'infinite',
            redraw: 'continous',
            time: 0,
            values: [.05]
          }
        ]
      }
    ]
  };

  stRenderer: StRenderer = { 
    stWidth: this.width, 
    stHeight: this.height,
    stCamera: this.stCamera,
    stScene: this.stScene
  };

  rendererId = this.rendererService.createRenderer();
  renderer: THREE.WebGLRenderer = this.rendererService.getRendererForId(this.rendererId);

  constructor() {
    const animate: (time: number) => void = ( time: number ) => {

      this.stScene.stMeshes[0].stAnimations.forEach(
        (animation: StAnimation) => {
          this.animationService.updateMeshForAnimation(mesh, animation);
        }
      );

      this.renderer.render( scene, camera );
    
    }

    this.stRenderer.stAnimation = animate;

    const camera = new THREE.PerspectiveCamera( 
      this.stCamera.stFrustrum,
      this.stCamera.stAspectRatio,
      this.stCamera.stNear,
      this.stCamera.stFar
    );
    camera.position.x = this.stCamera.stPosition.stX;
    camera.position.y = this.stCamera.stPosition.stY;
    camera.position.z = this.stCamera.stPosition.stZ;

    camera.lookAt(
      this.stCamera.stLookat.stX,
      this.stCamera.stLookat.stY,
      this.stCamera.stLookat.stZ
    );

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 
      this.stRenderer.stScene.stMeshes[0].stGeometry.stWidth, 
      this.stRenderer.stScene.stMeshes[0].stGeometry.stHeight, 
      this.stRenderer.stScene.stMeshes[0].stGeometry.stDepth
    );
    const material = new THREE.MeshNormalMaterial({side: THREE.FrontSide});
    const mesh = new THREE.Mesh( geometry, material );

    mesh.position.setX(this.stRenderer.stScene.stMeshes[0].stPosition.stX);
    mesh.position.setY(this.stRenderer.stScene.stMeshes[0].stPosition.stY);
    mesh.position.setZ(this.stRenderer.stScene.stMeshes[0].stPosition.stZ);

    mesh.rotation.x = this.stRenderer.stScene.stMeshes[0].stRotation.stX;
    mesh.rotation.y = this.stRenderer.stScene.stMeshes[0].stRotation.stY;
    mesh.rotation.z = this.stRenderer.stScene.stMeshes[0].stRotation.stZ;

    scene.add( mesh );

    this.renderer.setSize(this.stRenderer.stWidth, this.stRenderer.stHeight);
    this.renderer.setAnimationLoop( this.stRenderer.stAnimation );
    document.body.appendChild( this.renderer.domElement );

  }
}

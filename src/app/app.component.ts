import { Component, inject } from '@angular/core';
import * as THREE from 'three';
import { RendererService } from './services/three/renderer.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  rendererService: RendererService = inject(RendererService);
  title = 'Space & Time';
  width = window.innerWidth;
  height = window.innerHeight;
  rendererId = this.rendererService.createRenderer();
  renderer: THREE.WebGLRenderer = this.rendererService.getRendererForId(this.rendererId);

  constructor() {
    const animate = ( time: number ) => {
      // console.log(this);
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      this.renderer.render( scene, camera );
    
    }

    const camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
    camera.position.z = .5;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    //const renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize(this.width, this.height);
    this.renderer.setAnimationLoop( animate );
    document.body.appendChild( this.renderer.domElement );


  }
}

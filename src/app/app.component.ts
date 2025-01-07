import { Component } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Space & Time';
  width = window.innerWidth;
  height = window.innerHeight;

  constructor() {
    const camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
    camera.position.z = .5;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize(this.width, this.height);
    renderer.setAnimationLoop( animate );
    document.body.appendChild( renderer.domElement );

    function animate( time: number ) {

      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;
    
      renderer.render( scene, camera );
    
    }
  }
}

import THREE from '../lib/three';
import Renderer from '../lib/renderer';
import conevert from '../shaders/water/diffuse.vert';
import creamvert from '../shaders/water/diffuse.vert';
import conefrag from '../shaders/water/diffuse.frag';
import creamfrag from '../shaders/water/diffuse.frag';
import conetex from '../textures/cone.png';
import creamtex from '../textures/cream.png';

class Water extends Renderer {
  initScene() {
    if (!this.checkShader(conevert, conefrag) || !this.checkShader(creamvert, creamfrag)) {
      this.setErrorScene();
      return;
    }

    this.setLight();
    this.uniforms['conetex'] = {
      type: "t",
      value: new THREE.TextureLoader().load(conetex)
    };

    this.uniforms['creamtex'] = {
      type: "t",
      value: new THREE.TextureLoader().load(creamtex)
    };
    this.uniforms['textureDisplacement'] = {
      type: "t",
      value: new THREE.TextureLoader().load(creamtex)
    }
    this.uniforms['textureDimension'] = {
      type: 'vec2',
      value: new THREE.Vector2(100.0, 100.0)
    };

    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const g2 = new THREE.BoxGeometry(8, 12, 12, true);
    const conematerial = this.createShaderMaterial(conevert, conefrag);
    const creammaterial = this.createShaderMaterial(creamvert, creamfrag);
    const sphere = new THREE.Mesh(geometry, creammaterial);
    sphere.position.set(0, -2.2, 0);

    const box = new THREE.Mesh(g2, conematerial);
    box.position.set(0, 0, 0);
    this.scene.add(box);
    this.scene.add(sphere);
  }

  // update(dt) {
  //   if (!this.focussed) {
  //     this.updateCamera(dt / 12000);
  //   }
  // }
}

export default Water;
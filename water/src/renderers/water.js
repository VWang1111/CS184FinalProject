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

    // this.setLight();
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

    const tank = new THREE.PlaneGeometry(25, 30, true);
    const conematerial = this.createShaderMaterial(conevert, conefrag);
    const creammaterial = this.createShaderMaterial(creamvert, creamfrag);

    const plane = new THREE.Mesh(tank, conematerial);
    plane.position.set(0, 0, 0);
    this.scene.add(plane);

    // this.updateCamera(0, 0);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 24;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.setLight(0, 0, 26);
  }

  // update(dt) {
  //   if (!this.focussed) {
  //     this.updateCamera(dt / 12000);
  //   }
  // }
}

export default Water;
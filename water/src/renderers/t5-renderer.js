import THREE from '../lib/three';
import Renderer from '../lib/renderer';
import conevert from '../shaders/extra/cone.vert';
import creamvert from '../shaders/extra/cream.vert';
import conefrag from '../shaders/extra/cone.frag';
import creamfrag from '../shaders/extra/cream.frag';
import conetex from '../textures/cone.png';
import creamtex from '../textures/cream.png';

class T5Renderer extends Renderer {
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
    const g2 = new THREE.ConeGeometry(3, 8, 64, 64, true);
    const conematerial = this.createShaderMaterial(conevert, conefrag);
    const creammaterial = this.createShaderMaterial(creamvert, creamfrag);
    const sphere = new THREE.Mesh(geometry, creammaterial);
    sphere.position.set(0, -2.2, 0);

    const cone = new THREE.Mesh(g2, conematerial);
    cone.position.set(0, 3, 0);
    this.scene.add(cone);
    this.scene.add(sphere);
  }

  update(dt) {
    if (!this.focussed) {
      this.updateCamera(dt / 12000);
    }
  }
}

export default T5Renderer;
import THREE from '../lib/three';
import Renderer from '../lib/renderer';
import conevert from '../shaders/water/water.vert';
import conefrag from '../shaders/water/water.frag';
import texture from '../textures/water.png';

class Water extends Renderer {
  initScene() {
    if (!this.checkShader(conevert, conefrag)) {
      this.setErrorScene();
      return;
    }

    // this.setLight();
    this.uniforms['texture'] = {
      type: "t",
      value: new THREE.TextureLoader().load(texture)
    };

    const tank = new THREE.PlaneGeometry(63, 37, true);
    const watermaterial = this.createShaderMaterial(conevert, conefrag);

    const plane = new THREE.Mesh(tank, watermaterial);
    plane.position.set(0, 0, 0);
    this.scene.add(plane);

    // this.updateCamera(0, 0);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 24;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.setLight(0, 0, 33);
  }

  // update(dt) {
  //   if (!this.focussed) {
  //     this.updateCamera(dt / 12000);
  //   }
  // }
}

export default Water;
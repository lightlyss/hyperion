import React from 'react';
import * as THREE from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Mat = {
  TOON: 0,
  STD: 1,
  PHYS: 2,
  PHONG: 3
};

class Frame extends React.Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'js/ammo.js';
    script.async = true;
    script.onload = () => {
      window.Ammo().then(lib => {
        window.Ammo = lib;
        this.loadThree();
        this.animate();
      });
    };
    document.body.appendChild(script);
  }

  convertMaterials(materials, matType) {
    let array = [];
    for (let i = 0; i < materials.length; i++) {
      let m = null;
      switch (matType) {
        case Mat.TOON:
          m = new THREE.MeshToonMaterial();
          break;
        case Mat.STD:
          m = new THREE.MeshStandardMaterial();
          break;
        case Mat.PHYS:
          m = new THREE.MeshPhysicalMaterial();
          break;
        default:
          m = new THREE.MeshPhongMaterial();
      }
      m.copy(materials[i]);
      m.needsUpdate = true;
      array.push(m);
    }
    return array;
  }

  loadThree() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.modelUrl = `pmx/${this.props.model}/model.pmx`;
    this.motionUrls = this.props.motions.map(m => `vmd/${m}.vmd`);

    // Camera
    this.clock = new THREE.Clock();
    this.camera = new THREE.PerspectiveCamera(45, width/height, 1, 2000);
    this.camera.position.z = 30;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd1cdb7);

    this.gridHelper = new THREE.PolarGridHelper(30, 10);
    this.gridHelper.position.y = -10;
    this.scene.add(this.gridHelper);

    this.ambient = new THREE.AmbientLight(0x666666);
    this.scene.add(this.ambient);

    this.directionalLight = new THREE.DirectionalLight(0x887766);
    this.directionalLight.position.set(-1, 1, 1).normalize();
    this.scene.add(this.directionalLight);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Model
    this.helper = new MMDAnimationHelper({afterglow: 2.0});
    this.loader = new MMDLoader();
    this.loader.loadWithAnimation(this.modelUrl, this.motionUrls, model => {
      this.mesh = model.mesh;
      this.mesh.position.x = this.props.modelX || 0;
      this.mesh.position.y = this.props.modelY || -10;
      this.mesh.position.z = this.props.modelZ || 0;
      this.mesh.material = this.convertMaterials(this.mesh.material, Mat.PHONG);
      this.scene.add(this.mesh);
      this.helper.add(this.mesh, {animation: model.animation, physics: true});

      this.ikHelper = this.helper.objects.get(this.mesh).ikSolver.createHelper();
      this.ikHelper.visible = false;
      this.scene.add(this.ikHelper);

      this.physicsHelper = this.helper.objects.get(this.mesh).physics.createHelper();
      this.physicsHelper.visible = false;
      this.scene.add(this.physicsHelper);

      this.start();
    }, () => null, null);
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.helper.update(this.clock.getDelta());
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return(<div
      style={{width: '800px', height: '600px', padding: '0', margin: 'auto'}}
      ref={mount => {this.mount = mount;}}
    />);
  }
}

export default Frame;

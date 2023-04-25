import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { Scene, BoxGeometry,MeshBasicMaterial,Mesh, PerspectiveCamera, WebGLRenderer, Vector3, AxesHelper } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Color } from 'three';
import { AmbientLight } from 'three';
import { SpotLight } from 'three';
import {generate} from './terrain';

const canvas = document.querySelector('canvas.webgl');
const scene= new Scene();



const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.add( camera );
camera.position.z = 3;
camera.position.y=2;
camera.rotation.x = -0.5;

//ambient light
const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
ambientLight.position.z=9;
ambientLight.position.y=2;

const spothLight = new SpotLight(0xffffff, 1);
spothLight.position.set(255,255,255)
scene.add(spothLight);

const renderer = new WebGLRenderer({canvas,alpha:true});
renderer.setSize( window.innerWidth, window.innerHeight );

//axes helper
const axesHelper = new AxesHelper(5);
//scene.add( axesHelper );
//renderer.render( scene, camera );

//mountain loader
const mountainLoader=new GLTFLoader();
let mountainMesh;
mountainLoader.load('./model/mountain-low-policy.gltf',(gltf)=>{
  mountainMesh=gltf.scene;
  
  scene.add(mountainMesh)
  renderer.render( scene, camera );
})


function requestAnimationFrameLoop() {
  requestAnimationFrame(requestAnimationFrameLoop);
  if(mountainMesh && mountainMesh.rotation){
    renderer.render( scene, camera );
    mountainMesh.rotation.y += 0.01;
    //mountainMesh.rotation.x += 0.01;

  }
}

requestAnimationFrameLoop();

generate('.mountain-1');
generate('.mountain-2');
generate('.mountain-3');
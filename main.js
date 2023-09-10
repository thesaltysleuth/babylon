import * as BABYLON from '@babylonjs/core';
import { Inspector } from '@babylonjs/inspector';

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas);


function removeMeshShader(mesh) {
  mesh.material = null;
}

var createScene = function () {
  var scene = new BABYLON.Scene(engine);

  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);

  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

  var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1, segments: 32 }, scene);
  sphere.position = new BABYLON.Vector3(0.5, 0.5, 0);


  var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
  box.position = new BABYLON.Vector3(-0.5, 0.5, 0.5);

  var cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", { height: 1 }, scene);
  cylinder.position = new BABYLON.Vector3(0, 0.5, 1);

  // var newMaterial = new BABYLON.StandardMaterial;
  // newMaterial.diffuseColor = new BABYLON.Color3.Blue();

  BABYLON.SceneLoader.ImportMesh("", "./", "StanfordBunny.obj", scene, function (meshes) {
    if (meshes.length > 0) {
      var importedMesh = meshes[0];
      importedMesh.scaling = new BABYLON.Vector3(10, 10, 10);
      importedMesh.position = new BABYLON.Vector3(-1, 0, .5);
    }
  });




  const shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, "./objShader", {
    attributes: ["position", "normal", "uv"],
    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "objCenter"],
  });




  canvas.addEventListener("mousemove", function (event) {

    var pickedMesh = getMeshUnderMouse(scene, canvas);

    if (pickedMesh !== null) {
      console.log("Mouse over:", pickedMesh.name);
      scene.meshes.forEach(function (mesh) {
        removeMeshShader(mesh);
      });
      //console.log(pickedMesh.position.x);
      shaderMaterial.setVector3("objCenter", pickedMesh.position);
      pickedMesh.material = shaderMaterial;

    } else {
      console.log("Mouse not over any mesh.");
      scene.meshes.forEach(function (mesh) {
        removeMeshShader(mesh);
      });
    }
  });


  const groundMaterial = new BABYLON.StandardMaterial;
  var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
  ground.material = groundMaterial;

  groundMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);

  return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener('resize', function () {
  engine.resize();
});

Inspector.Show(scene, {});
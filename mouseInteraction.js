function getMeshUnderMouse(scene, canvas) {
    // Get the mesh under the mouse pointer
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);

    if (pickResult.hit) {
        // A mesh was picked, return the picked mesh
        return pickResult.pickedMesh;
    } else {
        // No mesh was picked, return null
        return null;
    }
}
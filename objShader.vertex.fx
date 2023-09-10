precision highp float;

// Attributes
attribute vec3 position;

// Uniforms
uniform mat4 worldViewProjection;

vec3 pos;

void main(void) {
    gl_Position = worldViewProjection * vec4(position, 1.0);
    pos=position;
}
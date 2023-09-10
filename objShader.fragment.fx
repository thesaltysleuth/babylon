precision highp float;

uniform vec3 objCenter;
vec3 pos;

void main(void) {
    

    float dist = distance(objCenter,pos);

    // Check if the pixel is within the outline width
    if (dist > 0.0) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Set the pixel to the outline color
    } else {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // Discard pixels outside the outline width
    }
}
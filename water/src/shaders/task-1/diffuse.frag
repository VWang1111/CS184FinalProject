precision highp float;

uniform vec3 lPosition;
uniform vec3 lIntensity;

varying vec3 fPosition;
varying vec3 fNormal;

void main() {
    // TODO: Part 5.1
    vec3 d = lPosition - fPosition;
    vec3 normalized = d / length(d);
    gl_FragColor = vec4(lIntensity * max(0.0, dot(fNormal, normalized))  / dot(d, d), 1.0);
}
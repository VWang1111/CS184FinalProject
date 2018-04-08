precision highp float;

uniform vec3 lPosition;
uniform vec3 lIntensity;

varying vec3 fPosition;
varying vec3 fNormal;

void main() {
    // TODO: Part 5.1
    vec3 diffuse = lIntensity / length(lPosition - fPosition) / length(lPosition - fPosition) 
    					* max(0.0, dot(normalize(fNormal), normalize(lPosition - fPosition)));
    gl_FragColor = vec4(diffuse, 1.0);
}
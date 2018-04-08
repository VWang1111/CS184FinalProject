precision highp float;

uniform vec3 cameraPosition;
uniform vec3 lPosition;
uniform vec3 lIntensity;

varying vec3 fPosition;
varying vec3 fNormal;

void main() {
    // TODO: Part 5.2
    vec3 d = lPosition - fPosition;
    vec3 normalized = d / length(d);
    vec3 v = cameraPosition - fPosition;
    vec3 h = (d + v) / length(d + v);
    vec4 diffuse = vec4(lIntensity * max(0.0, dot(fNormal, normalized))  / dot(d, d), 1.0);
    vec4 specular = vec4(lIntensity * pow(max(0.0, dot(fNormal, h)), 28.0)  / dot(d, d), 1.0);
    gl_FragColor = 0.05 * vec4(1.0,1.0,1.0,1.0) + 0.8 * diffuse + .5 * specular;
}
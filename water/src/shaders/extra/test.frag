precision highp float;

uniform float time;

void main() {
    // TODO: Part 5.1
    float t = time / 5.;
    float r = sin(t);
    float g = cos(t);
    float b = sin(t) + cos(t);
    gl_FragColor = vec4(r, g, b, 1.);
}
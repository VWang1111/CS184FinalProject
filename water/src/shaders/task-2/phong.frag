precision highp float;

uniform vec3 cameraPosition;
uniform vec3 lPosition;
uniform vec3 lIntensity;

varying vec3 fPosition;
varying vec3 fNormal;

void main() {
    // TODO: Part 5.2
    vec3 h = normalize(normalize(lPosition - fPosition) + normalize(cameraPosition - fPosition));
    float ka = 0.4, kd = 0.6, ks = 0.5;
    vec3 ambient = vec3(0.6, 0.8, 0.0);
    vec3 diffuse = lIntensity / length(lPosition - fPosition) / length(lPosition - fPosition) 
    					* max(0.0, dot(normalize(fNormal), normalize(lPosition - fPosition)));
    vec3 specular = lIntensity / length(lPosition - fPosition) / length(lPosition - fPosition)
    					* pow(max(0.0, dot(normalize(fNormal), h)), 100.0);
    gl_FragColor = vec4(ka * ambient + kd * diffuse + ks * specular, 1.0);
}
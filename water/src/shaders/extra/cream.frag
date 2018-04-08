precision highp float;

uniform sampler2D creamtex;

uniform vec3 cameraPosition;
uniform vec3 lPosition;
uniform vec3 lIntensity;

varying vec3 fPosition;
varying vec3 fNormal;
varying vec2 fUv;

void main() {
  	vec3 h = normalize(normalize(lPosition - fPosition) + normalize(cameraPosition - fPosition));
	float ka = 0.8, kd = 0.5, ks = 0.7;
	vec3 ambient = vec3(0.6, 0.8, 0.0);
	vec3 diffuse = lIntensity / length(lPosition - fPosition) / length(lPosition - fPosition) 
						* max(0.0, dot(normalize(fNormal), normalize(lPosition - fPosition)));
	vec3 specular = lIntensity / length(lPosition - fPosition) / length(lPosition - fPosition)
						* pow(max(0.0, dot(normalize(fNormal), h)), 100.0);
  	gl_FragColor = vec4(ka * vec3(texture2D(creamtex, fUv)) + kd * diffuse + ks * specular, 1.0);
}
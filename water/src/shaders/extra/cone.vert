attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 tangent;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform sampler2D textureDisplacement;
uniform vec2 textureDimension;

varying vec2 fUv;
varying vec3 fPosition;
varying vec3 fNormal;

void main() {
	fUv = uv;

	vec3 offset = position;
	vec3 b = cross(normal, tangent);
	mat3 tbn = mat3(tangent, b, normal);

	vec4 idk = texture2D(textureDisplacement, uv);
	vec4 du_tex = texture2D(textureDisplacement, uv + vec2(1.0/textureDimension.x, 0));
	vec4 dv_tex = texture2D(textureDisplacement, uv + vec2(0, 1.0/textureDimension.y));

	float heightScaling = 0.04 * (4.0-position.y);
	offset += normal * idk.b * heightScaling;

	float normalScaling = 0.25;
	float du = (du_tex.b - idk.b) * heightScaling * normalScaling;
	float dv = (dv_tex.b - idk.b) * heightScaling * normalScaling;
	vec3 no = vec3(-du, -dv, 1.0);
	fPosition = offset;
	fNormal = tbn * no;

	//fPosition = vec3(modelMatrix * vec4(position, 1.0));
    //fNormal = normalize(vec3(modelMatrix * vec4(normal, 0.0)));
  	gl_Position = projectionMatrix * modelViewMatrix * vec4(offset, 1.0);
}
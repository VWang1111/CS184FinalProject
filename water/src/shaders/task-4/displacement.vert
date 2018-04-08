attribute vec3 position;
attribute vec3 normal;
attribute vec3 tangent;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;
uniform sampler2D textureDisplacement;
uniform vec2 textureDimension;

varying vec3 fPosition;
varying vec3 fNormal;

void main() {
    vec3 offset = position;
    vec3 b = cross(normal, tangent);
    mat3 tbn = mat3(tangent, b, normal);
    float height = textureDimension[0];
    float width = textureDimension[1];

    float heightScaling = 0.9;
    float normalScaling = 1.0;
    vec2 u1v = vec2(uv[0] + 1.0 / width, uv[1]);
    vec2 uv1 = vec2(uv[0], uv[1] + 1.0 / height);
    float huv = texture2D(textureDisplacement, uv)[0];
    float hu1v = texture2D(textureDisplacement, u1v)[0];
    float huv1 = texture2D(textureDisplacement, uv1)[0];

    float dU = heightScaling * normalScaling * (hu1v - huv);
    float dV = heightScaling * normalScaling * (huv1 - huv);
    vec3 no = vec3(-dU, -dV, 1.0);

    fPosition = vec3(modelMatrix * vec4(position, 1.0)) ;
    fNormal = vec3(modelMatrix * vec4(tbn * no, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(offset + no * huv * heightScaling, 1.0);
}
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

    vec4 idk = texture2D(textureDisplacement, uv);
    vec4 du_tex = texture2D(textureDisplacement, uv + vec2(1.0/textureDimension.x, 0));
    vec4 dv_tex = texture2D(textureDisplacement, uv + vec2(0, 1.0/textureDimension.y));
    // TODO: Compute displaced vertices
    float heightScaling = 0.8;
    // offset += normal * idk.r * heightScaling;
    // TODO: Compute displaced normals
    float normalScaling = 1.0;
    float du = (du_tex.r - idk.r) * heightScaling * normalScaling;
    float dv = (dv_tex.r - idk.r) * heightScaling * normalScaling;
    vec3 no = vec3(-du, -dv, 1.0);
    fPosition = offset;
    fNormal = tbn * no;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(offset, 1.0);
}
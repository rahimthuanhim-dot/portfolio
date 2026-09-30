varying float vElevation;

void main() {
  vElevation = position.z;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

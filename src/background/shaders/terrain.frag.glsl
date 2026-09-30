uniform float uLineOpacity;

varying float vElevation;

void main() {
  float contour = smoothstep(-0.2, 0.2, vElevation);
  vec3 shadowTone = vec3(0.28, 0.58, 0.52);
  vec3 highlightTone = vec3(0.72, 0.98, 0.84);

  gl_FragColor = vec4(mix(shadowTone, highlightTone, contour), uLineOpacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}

export const topographicVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const topographicFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorBg;
  uniform vec3 uColorLine;
  varying vec2 vUv;
  varying vec3 vPosition;

  // Optimized Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // Use vPosition instead of vUv to ensure perfect aspect ratio (no stretching)
    // Decreased scale to 0.4 to zoom back in
    vec2 p = vPosition.xy * 0.4; 
    
    // Add continuous directional scrolling (panning diagonally)
    p.y += uTime * 0.05;
    p.x += uTime * 0.025;
    
    // Very slow domain warping vectors
    float warpTime = uTime * 0.02;
    vec2 warp = vec2(
      snoise(p * 0.4 + vec2(warpTime, 0.0)),
      snoise(p * 0.4 + vec2(0.0, warpTime))
    );

    // Single octave Simplex noise for perfectly smooth, large blobs and winding channels
    float noiseVal = snoise(p + warp * 0.6);

    // Decreased multiplier to 4.0 to significantly reduce the number of lines
    float lineVal = noiseVal * 4.0; 
    
    // Distance from the nearest integer (contour center)
    float dist = abs(fract(lineVal) - 0.5); 
    
    // Hardware standard derivatives for perfect 1px line thickness at any scale
    float fw = fwidth(lineVal); 
    
    // Sharp anti-aliasing
    float line = smoothstep(fw * 0.8, 0.0, dist);
    
    // Mix background and line color
    vec3 col = mix(uColorBg, uColorLine, line * 0.4);

    gl_FragColor = vec4(col, 1.0);
  }
`;

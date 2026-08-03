export const topographicVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const topographicFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorBg;
  uniform vec3 uColorLine;
  varying vec2 vUv;

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

  // FBM
  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 4; ++i) { // Reduced octaves for softer, less noisy look
      v += a * snoise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Lower scale significantly for massive, sweeping contours
    vec2 p = vUv * 0.15; 
    
    // Add continuous directional scrolling (panning upwards)
    // This gives the feeling of moving over a map rather than just breathing in place
    p.y -= uTime * 0.02;
    p.x -= uTime * 0.01;
    
    // Extremely slow breathing animation for the warping effect
    float t = uTime * 0.008;  

    // Organic Domain Warping
    vec2 q = vec2(0.);
    q.x = fbm( p + vec2(t) );
    q.y = fbm( p + vec2(1.0) );

    vec2 r = vec2(0.);
    r.x = fbm( p + 1.0*q + vec2(1.7,9.2)+ 0.15*t );
    r.y = fbm( p + 1.0*q + vec2(8.3,2.8)+ 0.126*t );

    float f = fbm(p + r);

    // Number of contour lines mapped over the noise value (lower for fewer lines and massive spacing)
    float lineVal = f * 3.0; 
    
    // Distance from the nearest integer (contour center)
    float dist = abs(fract(lineVal) - 0.5); 
    
    // fwidth calculates how much lineVal changes per pixel.
    // We use it to ensure the line is exactly 1-1.5 pixels wide regardless of scaling.
    float fw = fwidth(lineVal); 
    
    // Sharp anti-aliasing: line is opaque near 0.0 distance, transparent outside width
    // Multiplied by 0.7 to keep it thin and subtle
    float line = smoothstep(fw * 0.7, 0.0, dist);
    
    // Mix the deep black background with the off-white line color
    // We multiply 'line' by 0.3 for subtleness (so it isn't pure white/distracting)
    vec3 col = mix(uColorBg, uColorLine, line * 0.3);

    gl_FragColor = vec4(col, 1.0);
  }
`;

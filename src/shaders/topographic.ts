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

  // Simplex 2D noise
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
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) {
      v += a * snoise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = vUv * 3.0;
    
    // Slow evolution
    float t = uTime * 0.02; // Roughly 1 cycle per 50 seconds based on uTime scale passed in

    // Deform UV coordinates using fbm and time
    vec2 q = vec2(0.);
    q.x = fbm( p + vec2(t) );
    q.y = fbm( p + vec2(1.0) );

    vec2 r = vec2(0.);
    r.x = fbm( p + 1.0*q + vec2(1.7,9.2)+ 0.15*t );
    r.y = fbm( p + 1.0*q + vec2(8.3,2.8)+ 0.126*t );

    float f = fbm(p + r);

    // Create topographic contour lines
    // Multiply f to increase number of lines, fract to repeat, then smoothstep for thickness
    float lines = fract(f * 8.0);
    // Very thin lines, anti-aliased with smoothstep
    float thickness = 0.03;
    float line = smoothstep(0.5 - thickness, 0.5, lines) - smoothstep(0.5, 0.5 + thickness, lines);
    
    // Mix background and line color
    vec3 col = mix(uColorBg, uColorLine, line * 0.4); // 0.4 for subtlety (off-white)

    gl_FragColor = vec4(col, 1.0);
  }
`;

// Author @patriciogv - 2015

#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359
uniform vec2 u_resolution;
uniform float u_time;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size, float angle){
    vec2 newUV = _st;
    // move space from the center to the vec2(0.0)
    newUV -= vec2(0.5);
    // rotate the space
    newUV = rotate2d( angle) * newUV;
    // move it back to the original place
    newUV += vec2(0.5);
    
    
    return  box(newUV, vec2(_size,_size/4.)) +
            box(newUV, vec2(_size/4.,_size));
}
vec2 TilePattern(vec2 st, float tileScale){
    st *= tileScale;
    return fract(st);
}

float ShapeAtQuad(vec2 _st, float shape,vec2 quadrant,float divisions){
    float spacing = 1.0/divisions;
    float finalShape;
	vec2 curQuad = vec2(quadrant.x / divisions, quadrant.y/divisions);
	vec4 quadSpace = vec4(curQuad.x-spacing,curQuad.x,curQuad.y-spacing,curQuad.y);
    
    if (_st.x > quadSpace.x && _st.x < quadSpace.y){
    	if (_st.y > quadSpace.z && _st.y < quadSpace.w){
	        finalShape = shape;
            
        }
        else{
            finalShape = 0.0;
        }
    }
	else{
        finalShape = float(0.0);
    }
    
    return finalShape;
}
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

	vec2 oldUV = st;
    st = TilePattern(st, 3.); // Wrap arround 1.0

    // Now we have 3 spaces that goes from 0-1
	
    float cross1 = cross(st,0.732,.8);
    float circle = circle(st, .5);
    
    
    
    color = vec3(st,0.0);
	color += ShapeAtQuad(oldUV,cross1,vec2(1.,1.),3.);
	color += ShapeAtQuad(oldUV,circle,vec2(2.,1.),3.);
	color += ShapeAtQuad(oldUV,cross1,vec2(3.,1.),3.);
	color += ShapeAtQuad(oldUV,circle,vec2(1.,2.),3.);
	color += ShapeAtQuad(oldUV,cross1,vec2(2.,2.),3.);
	color += ShapeAtQuad(oldUV,cross1,vec2(3.,2.),3.);
	color += ShapeAtQuad(oldUV,circle,vec2(1.,3.),3.);
	color += ShapeAtQuad(oldUV,cross1,vec2(2.,3.),3.);
	color += ShapeAtQuad(oldUV,circle,vec2(3.,3.),3.);


	gl_FragColor = vec4(color,1.0);
}

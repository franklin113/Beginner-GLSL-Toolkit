
// Author: Inigo Quiles
// Title: Impulse

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float Circle(vec2 st, vec2 center, float scale, float width){
    float pct = 0.0;
    pct = distance(st,center);
    if (pct < scale && pct > scale-width){
        return 1.0;
    }
    else {
        return 0.0;
    }
}

float Circle(vec2 st, vec2 center, float scale){
    float pct = 0.0;
    pct = distance(st,center);
    if (pct < scale){
        return 1.0;
    }
    else{
        return 0.0;
    }
}

float GetSquare(vec2 st, float size,bool feathers){
    float square;
    vec2 bordersA, bordersB;
    
    if (feathers == true){
    //smooth step feathers
    //https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/smoothstep.xhtml
    bordersA = smoothstep(0.,size,st);
    bordersB = smoothstep(0.,size,1.0-st);
    }
    
    else {
    //step does not
    //https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/step.xhtml
    bordersA = step(size,st);
    bordersB = step(size,1.0-st);
    }

    //logical AND
    square = bordersA.x*bordersA.y*bordersB.x*bordersB.y;
    
    return square;
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    vec3 color = vec3(0.0, 0.0, 0.0);
    //float blueSquare = GetSquare(st,.04,false);
    //color *= blueSquare;
    
    float scale = .5;

    float newRing = step(.45,Circle(st,vec2(.5,.5),scale,.005));
    vec3 ringColor = vec3(0.1333, 0.8784, 0.0);
    vec3 ring = ringColor * newRing;

    color += ring;

    //Create the rings
    for (int i = 0;i<9;i++){
        ringColor = vec3(0.0627, 0.2784, 0.0078);
        scale -= .05;
        newRing = step(.45,Circle(st,vec2(.5,.5),scale,.002));
        ring = ringColor * newRing;
        color += ring;
    }

    vec3 blipColor = vec3(0.0, 0.2353, 1.0);

    vec2 blip1Pos = vec2(
        (2.0-sin(u_time*.05)*2.)*.5+.2,
        2.0-cos(u_time*.05)*2.)*.1+.5;

    float blip1 = Circle(st, blip1Pos, .02);

    vec3 newBlip = blipColor * blip1;

    color += newBlip;

    blip1Pos = vec2(
        (2.0-sin(u_time*.08)*2.)*.5+.5,
        2.0-cos(u_time*.06)*2.)*.1+.4;

    blip1 = Circle(st, blip1Pos, .02);

    newBlip = blipColor * blip1;

    color += newBlip;

    blip1Pos = vec2(
        (2.0-sin(u_time*.15)*2.)*.5+.2,
        2.0-cos(u_time*.1)*2.)*.2+.5;

    blip1 = Circle(st, blip1Pos, .02);

    newBlip = blipColor * blip1;

    color += newBlip;


    //add rings on top
    
    //vec3 BGSquare = vec3(.2,.4,.6)*
    

    gl_FragColor = vec4(color,1.0);
}

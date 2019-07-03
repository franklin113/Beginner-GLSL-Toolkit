//Returns a square
//you can either have it be feathered or not
// to feather the square, make feathers true

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
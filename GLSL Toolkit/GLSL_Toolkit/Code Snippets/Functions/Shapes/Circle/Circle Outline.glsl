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
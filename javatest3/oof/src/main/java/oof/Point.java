package oof;

class Point {
    public int x;
    public int y;

    public Point(int x, int y){
        this.x = x;
        this.y = y;
    }

    public void set(Point p){
        this.x = p.x;
        this.x = p.y;
    }

    public void set(int i, int j){
        this.x = i;
        this.x = j;
    }

    public String toString(){
        return x + ", " + y;
    }
}
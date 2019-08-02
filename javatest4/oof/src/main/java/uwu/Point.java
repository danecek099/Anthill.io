package uwu;

class Point {
    public int x;
    public int y;

    public Point(int x, int y){
        this.x = x;
        this.y = y;
    }

    public void set(Point p){
        this.x = p.x;
        this.y = p.y;
    }

    public void set(int i, int j){
        this.x = i;
        this.y = j;
    }

    public boolean equals(Point p){
        return (this.x == p.x && this.y == p.y);
    }

    public String toString(){
        return String.format("[%d, %d]", x, y);
    }
}
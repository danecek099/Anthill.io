package oof;

class PathPoints {
    public int x1;
    public int y1;
    public int x2;
    public int y2;
    public int s;
    public boolean attack;

    public Point getStartD(){
        return new Point(x1, y1);
    }

    public Point getEndD(){
        return new Point(x2, y2);
    }

    public String toString(){
        return x1 + ", " + y1 + "; " + x2 + ", " + y2;
    }
}
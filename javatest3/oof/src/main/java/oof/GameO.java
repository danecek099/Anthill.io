package oof;

class GameO {
    public int dX;
    public int dY;
    public int dS;

    public String toString(){
        // return dX + ", " + dY + ", " + dS;
        return String.format("[%d, %d, %d]", dX, dY, dS);
    }
}
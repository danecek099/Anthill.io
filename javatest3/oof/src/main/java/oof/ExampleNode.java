package oof;

public class ExampleNode extends AbstractNode {

    public ExampleNode(int xPosition, int yPosition) {
        super(xPosition, yPosition);
        // do other init stuff
        this.setIsDiagonaly(true);
    }

    public void sethCosts(AbstractNode endNode) {
        this.sethCosts((absolute(this.getxPosition() - endNode.getxPosition())
                + absolute(this.getyPosition() - endNode.getyPosition()))
                * BASICMOVEMENTCOST);
    }

    private int absolute(int a) {
        return a > 0 ? a : -a;
    }

    public Point getAsPoint(){
        return new Point(xPosition, yPosition);
    }

}

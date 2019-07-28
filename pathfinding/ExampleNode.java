package pathfinding;

/**
 * A simple Example implementation of a Node only overriding the sethCosts
 * method; uses manhatten method.
 */
public class ExampleNode extends AbstractNode {

    public ExampleNode(int xPosition, int yPosition) {
        super(xPosition, yPosition);
        // do other init stuff
    }

    public void sethCosts(AbstractNode endNode) {
        this.sethCosts((absolute(this.getxPosition() - endNode.getxPosition())
                + absolute(this.getyPosition() - endNode.getyPosition()))
                * BASICMOVEMENTCOST);
    }

    private int absolute(int a) {
        return a > 0 ? a : -a;
    }

}

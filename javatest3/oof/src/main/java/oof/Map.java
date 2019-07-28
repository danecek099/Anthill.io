/*
 * // TODO
 * possible optimizations:
 * - calculate f as soon as g or h are set, so it will not have to be
 *      calculated each time it is retrieved
 * - store nodes in openList sorted by their f value.
 */

package oof;

import java.util.LinkedList;
import java.util.List;

public class Map<T extends AbstractNode> {

    /** weather or not it is possible to walk diagonally on the map in general. */
    protected static boolean CANMOVEDIAGONALY = true;

    /** holds nodes. first dim represents x-, second y-axis. */
    private T[][] nodes;

    /** width + 1 is size of first dimension of nodes. */
    protected int width;
    /** higth + 1 is size of second dimension of nodes. */
    protected int higth;
    /**
     * constructs a squared map with given width and hight.
     * <p>
     * The nodes will be instanciated througth the given nodeFactory.
     *
     * @param width
     * @param higth
     * @param nodeFactory 
     */
    public Map(int width, int higth) {
        // TODO check parameters. width and higth should be > 0.
        nodes = (T[][]) new AbstractNode[width][higth];
        this.width = width - 1;
        this.higth = higth - 1;
        initEmptyNodes();
    }

    public AbstractNode createNode(int x, int y) {
        return new ExampleNode(x, y);
    }

    /**
     * initializes all nodes. Their coordinates will be set correctly.
     */
    private void initEmptyNodes() {
        for (int i = 0; i <= width; i++) {
            for (int j = 0; j <= higth; j++) {
                nodes[i][j] = (T) createNode(i, j);
            }
        }
    }

    /**
     * sets nodes walkable field at given coordinates to given value.
     * <p>
     * x/y must be bigger or equal to 0 and smaller or equal to width/hight.
     *
     * @param x
     * @param y
     * @param bool
     */
    public void setWalkable(int x, int y, boolean bool) {
        // TODO check parameter.
        nodes[x][y].setWalkable(bool);
    }

    public boolean isWalkableAt(int x, int y) {
        return nodes[x][y].isWalkable();
    }

    /**
     * returns node at given coordinates.
     * <p>
     * x/y must be bigger or equal to 0 and smaller or equal to width/hight.
     *
     * @param x
     * @param y
     * @return node
     */
    public final T getNode(int x, int y) {
        // TODO check parameter.
        return nodes[x][y];
    }

    /**
     * prints map to sto. Feel free to override this method.
     * <p>
     * a player will be represented as "o", an unwakable terrain as "#".
     * Movement penalty will not be displayed.
     */
    public String drawMap() {
        String s = "";

        for (int i = 0; i <= width; i++) {
            // print(" _"); // boarder of map
            s += " _";
        }
        // print("\n");
        s += "\n";

        for (int j = higth; j >= 0; j--) {
            // print("|"); // boarder of map
            s += "|";
            for (int i = 0; i <= width; i++) {
                if (nodes[i][j].isWalkable()) {
                    // print("  ");
                    s += " ";
                } else {
                    // print(" #"); // draw unwakable
                    s += " #";
                }
            }
            // print("|\n"); // boarder of map
            s += "|\n";
        }

        for (int i = 0; i <= width; i++) {
            // print(" _"); // boarder of map
            s += " _";
        }

        return s;
    }

    /**
     * prints something to sto.
     */
    private void print(String s) {
        System.out.print(s);
    }


    /* Variables and methodes for path finding */


    // variables needed for path finding

    /** list containing nodes not visited but adjacent to visited nodes. */
    private List<T> openList;
    /** list containing nodes already visited/taken care of. */
    private List<T> closedList;
    /** done finding path? */
    private boolean done = false;

    /**
     * finds an allowed path from start to goal coordinates on this map.
     * <p>
     * This method uses the A* algorithm. The hCosts value is calculated in
     * the given Node implementation.
     * <p>
     * This method will return a LinkedList containing the start node at the
     * beginning followed by the calculated shortest allowed path ending
     * with the end node.
     * <p>
     * If no allowed path exists, an empty list will be returned.
     * <p>
     * <p>
     * x/y must be bigger or equal to 0 and smaller or equal to width/hight.
     *
     * @param oldX
     * @param oldY
     * @param newX
     * @param newY
     * @return
     */
    public final List<T> findPath(int oldX, int oldY, int newX, int newY) {
        // TODO check input
        openList = new LinkedList<T>();
        closedList = new LinkedList<T>();
        openList.add(nodes[oldX][oldY]); // add starting node to open list

        done = false;
        T current;
        while (!done) {
            current = lowestFInOpen(); // get node with lowest fCosts from openList
            closedList.add(current); // add current node to closed list
            openList.remove(current); // delete current node from open list

            if ((current.getxPosition() == newX)
                    && (current.getyPosition() == newY)) { // found goal
                return calcPath(nodes[oldX][oldY], current);
            }

            // for all adjacent nodes:
            List<T> adjacentNodes = getAdjacent(current);
            for (int i = 0; i < adjacentNodes.size(); i++) {
                T currentAdj = adjacentNodes.get(i);
                if (!openList.contains(currentAdj)) { // node is not in openList
                    currentAdj.setPrevious(current); // set current node as previous for this node
                    currentAdj.sethCosts(nodes[newX][newY]); // set h costs of this node (estimated costs to goal)
                    currentAdj.setgCosts(current); // set g costs of this node (costs from start to this node)
                    openList.add(currentAdj); // add node to openList
                } else { // node is in openList
                    if (currentAdj.getgCosts() > currentAdj.calculategCosts(current)) { // costs from current node are cheaper than previous costs
                        currentAdj.setPrevious(current); // set current node as previous for this node
                        currentAdj.setgCosts(current); // set g costs of this node (costs from start to this node)
                    }
                }
            }

            if (openList.isEmpty()) { // no path exists
                return new LinkedList<T>(); // return empty list
            }
        }
        return null; // unreachable
    }

    /**
     * calculates the found path between two points according to
     * their given <code>previousNode</code> field.
     *
     * @param start
     * @param goal
     * @return
     */
    private List<T> calcPath(T start, T goal) {
     // TODO if invalid nodes are given (eg cannot find from
     // goal to start, this method will result in an infinite loop!)
        LinkedList<T> path = new LinkedList<T>();

        T curr = goal;
        boolean done = false;
        while (!done) {
            path.addFirst(curr);
            curr = (T) curr.getPrevious();

            if (curr.equals(start)) {
                done = true;
            }
        }
        return path;
    }

    /**
     * returns the node with the lowest fCosts.
     *
     * @return
     */
    private T lowestFInOpen() {
        // TODO currently, this is done by going through the whole openList!
        T cheapest = openList.get(0);
        for (int i = 0; i < openList.size(); i++) {
            if (openList.get(i).getfCosts() < cheapest.getfCosts()) {
                cheapest = openList.get(i);
            }
        }
        return cheapest;
    }

    /**
     * returns a LinkedList with nodes adjacent to the given node.
     * if those exist, are walkable and are not already in the closedList!
     */
    private List<T> getAdjacent(T node) {
        // TODO make loop
        int x = node.getxPosition();
        int y = node.getyPosition();
        List<T> adj = new LinkedList<T>();

        T temp;
        if (x > 0) {
            temp = this.getNode((x - 1), y);
            if (temp.isWalkable() && !closedList.contains(temp)) {
                temp.setIsDiagonaly(false);
                adj.add(temp);
            }
        }

        if (x < width) {
            temp = this.getNode((x + 1), y);
            if (temp.isWalkable() && !closedList.contains(temp)) {
                temp.setIsDiagonaly(false);
                adj.add(temp);
            }
        }

        if (y > 0) {
            temp = this.getNode(x, (y - 1));
            if (temp.isWalkable() && !closedList.contains(temp)) {
                temp.setIsDiagonaly(false);
                adj.add(temp);
            }
        }

        if (y < higth) {
            temp = this.getNode(x, (y + 1));
            if (temp.isWalkable() && !closedList.contains(temp)) {
                temp.setIsDiagonaly(false);
                adj.add(temp);
            }
        }


        // add nodes that are diagonaly adjacent too:
        if (CANMOVEDIAGONALY) {
            if (x < width && y < higth) {
                temp = this.getNode((x + 1), (y + 1));
                if (temp.isWalkable() && !closedList.contains(temp)) {
                    temp.setIsDiagonaly(true);
                    adj.add(temp);
                }
            }

            if (x > 0 && y > 0) {
                temp = this.getNode((x - 1), (y - 1));
                if (temp.isWalkable() && !closedList.contains(temp)) {
                    temp.setIsDiagonaly(true);
                    adj.add(temp);
                }
            }

            if (x > 0 && y < higth) {
                temp = this.getNode((x - 1), (y + 1));
                if (temp.isWalkable() && !closedList.contains(temp)) {
                    temp.setIsDiagonaly(true);
                    adj.add(temp);
                }
            }

            if (x < width && y > 0) {
                temp = this.getNode((x + 1), (y - 1));
                if (temp.isWalkable() && !closedList.contains(temp)) {
                    temp.setIsDiagonaly(true);
                    adj.add(temp);
                }
            }
        }
        return adj;
    }

}

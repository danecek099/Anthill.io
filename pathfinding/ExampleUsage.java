package pathfinding;

import java.util.List;

public class ExampleUsage {

    public static void main(String[] args) {
        Map<ExampleNode> myMap = new Map<ExampleNode>(500, 500);

        long time = System.nanoTime();

        List<ExampleNode> path = myMap.findPath(1, 250, 499, 250);

        System.out.println((System.nanoTime() - time) / 1000000);

        // for (int i = 0; i < path.size(); i++) {
        //     System.out.print("(" + path.get(i).getxPosition() + ", " + path.get(i).getyPosition() + ") -> ");
        // }
    }


}

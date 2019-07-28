package oof;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/*
    Collection collection = new ArrayList();
    collection.add(g.fromJson(array.get(1), int.class));
    System.out.println(g.toJson(collection));
*/

public final class App {

    static int gameW = 200;
    static int gridRess = 20;
    static int gameBorder = 20;

    static Map<ExampleNode> myMap;
    static int sizeD;
    static Gson g;
    static int resGcW;
    static int resGcA;

    public static void main(String[] args) {
        g = new Gson();

        startThatShit();
        readUntilYouDieFaggot();
    }

    private static void removeObjects(JsonArray array){
        int size = array.size();

        for (int i = 1; i < size; i++) {
            GameO gO = g.fromJson(array.get(i), GameO.class);

            for (int j = 0; j < gO.dS; j++) {
                for (int k = 0; k < gO.dS; k++) {
                    myMap.setWalkable(gO.dX + j, gO.dY + k, true);
                }
            }
        }
    }

    private static void addObjects(JsonArray array){
        int size = array.size();

        for (int i = 1; i < size; i++) {
            GameO gO = g.fromJson(array.get(i), GameO.class);

            for (int j = 0; j < gO.dS; j++) {
                for (int k = 0; k < gO.dS; k++) {
                    myMap.setWalkable(gO.dX + j, gO.dY + k, false);
                }
            }
        }
    }

    interface End {
        void end(String param);
    }

    private static void findPath(JsonArray array){
        Collection collection = new ArrayList();
        collection.add(g.fromJson(array.get(1), int.class));
        PathPoints p = g.fromJson(array.get(2), PathPoints.class);

        End e = (param) -> {
            collection.add(false);
            collection.add(param);
            System.out.println(g.toJson(collection));
        };

        Point start = p.getStartD();
        Point end = p.getEndD();

        // collider s hranou plochy
        if(end.x > resGcW || end.y > resGcW || end.x < resGcA || end.y < resGcA) {
            e.end("collider");
            return;
        }

        // start point check
        if(!myMap.isWalkableAt(start.x, start.y)){
            Point res = findPoint(start.x, start.y);
            if(res != null) {
                start.set(res);
            } else {
                e.end("start point");
            }
        }

        //end point check
        if(!myMap.isWalkableAt(end.x, end.y)){
            if(p.s == 0){ // neplatnej BOD blízko/kolem gameO
                Point res = findPoint(end.x, end.y);
                if(res != null) {
                    end.set(res);
                } else {
                    e.end("end point");
                }
            } else { // nejbližší bod ke gameO
                double min = Double.MAX_VALUE;
                Point point = null;

                int half = Math.round(p.s / 2);
                int mod = p.s % 2 == 0 ? -1 : 0;

                for(int i = end.x - half + mod; i <= end.x + half + 1; i++){
                    for(int j = end.y - half + mod; j <= end.y + half + 1; j++){
                        if(myMap.isWalkableAt(i ,j)){
                            int vx = Math.abs(i - start.x),
                                vy = Math.abs(j - start.y);
                            double magnitude = Math.sqrt(vx * vx + vy * vy);

                            if(magnitude < min){
                                min = magnitude;
                                point = new Point(i, j);
                            }
                        }
                    }
                }

                if(point != null){
                    end.set(point);
                } else {
                    e.end("end point 2");
                    return;
                }
            }
        }

        List<ExampleNode> path = myMap.findPath(start.x, start.y, end.x, end.y);
        path = toReal(path);

        int pSize = path.size();
        for (int i = 0; i < pSize; i++) {
            collection.add(path.get(i).getAsPoint());
        }

        if(p.attack) collection.add("target");

        System.out.println(g.toJson(collection));
        System.out.println(g.toJson(myMap.drawMap()));
    }

    private static List<ExampleNode> toReal(List<ExampleNode> array){
        array.forEach((node) -> {
            node.setCoordinates(
                node.getxPosition() * gridRess,
                node.getyPosition() * gridRess
            );
        });
        return array;
    }

    private static Point findPoint(int x, int y){
        int s = 0;

        while(s < 5){ // max dS 5 asi...
            s++;                   // round() + 1 -> 23.02, v3.2
            for(int i = x - Math.round(s / 2) + 1; i < x + s - 1; i++){
                for(int j = y - Math.round(s / 2) + 1; j < y + s - 1; j++){
                    if(myMap.isWalkableAt(i, j)) return new Point(i, j);
                }
            }
        }
        return null;
    }

    private static void startThatShit(){
        sizeD = gameW / gridRess;
        resGcA = gameBorder / gridRess;
        resGcW = (gameW - gameBorder) / gridRess;
        myMap = new Map<ExampleNode>(sizeD, sizeD);
    }

    private static void readUntilYouDieFaggot(){
        BufferedReader buff = new BufferedReader(new InputStreamReader(System.in));
            
        while(true){
            try {
                String json = buff.readLine();
                // JsonOof j = g.fromJson(message, JsonOof.class);
                JsonParser parser = new JsonParser();
                JsonArray array = parser.parse(json).getAsJsonArray();

                String command = g.fromJson(array.get(0), String.class);

                switch(command){
                    case "addObject":
                        addObjects(array);
                    break;
                    case "removeObject":
                        removeObjects(array);
                    break;
                    case "findPath":
                        findPath(array);
                    break;

                    default:
                        System.out.print("oof");
                    break;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

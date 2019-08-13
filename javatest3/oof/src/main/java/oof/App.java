package oof;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

/*
    Collection collection = new ArrayList();
    collection.add(g.fromJson(array.get(1), int.class));
    System.out.println(g.toJson(collection));
*/

public final class App {

    static int gameW = 10000;
    static int gridRess = 20;
    static int gameBorder = 100;

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

            for (int j = 0; j <= gO.dS; j++) {
                for (int k = 0; k <= gO.dS; k++) {
                    myMap.setWalkable(gO.dX + j, gO.dY + k, true);
                }
            }
        }
    }

    private static void addObjects(JsonArray array){
        int size = array.size();

        for (int i = 1; i < size; i++) {
            GameO gO = g.fromJson(array.get(i), GameO.class);

            for (int j = 0; j <= gO.dS; j++) {
                for (int k = 0; k <= gO.dS; k++) {
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

        Point start = new Point(
            p.x1 / gridRess,
            p.y1 / gridRess
        );

        Point end;
        if(p.s != 0) {
            end = new Point( // gameO
                p.x2,
                p.y2
            );
        } else {
            end = new Point( // antO
                p.x2 / gridRess,
                p.y2 / gridRess
            );
        }

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

                for(int i = end.x - 1; i <= end.x + p.s + 1; i++){
                    for(int j = end.y - 1; j <= end.y + p.s + 1; j++){
                        if(myMap.isWalkableAt(i, j)){
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

        if(start.equals(end)){
            e.end("start == end");
            return;
        }
        
        List<ExampleNode> path = myMap.findPath(start.x, start.y, end.x, end.y);
        if(path.size() == 0) {
            e.end("no path");
            return;
        } else if(path.size() < 3) {
            collection.addAll(toReal(path));
        } else {
            List<ExampleNode> smoothed = new LinkedList<ExampleNode>();
    
            int size = path.size();
            int[] v1 = vector(path.get(0), path.get(1));
            smoothed.add(path.get(0));
            for (int i = 2; i < size; i++) {
                int[] v2 = vector(path.get(i - 1), path.get(i));
                if(!compare(v1, v2)) smoothed.add(path.get(i - 1));
                v1 = v2;
            }

            smoothed.add(path.get(size - 1));
            collection.addAll(toReal(smoothed));
        }

        if(p.attack) collection.add("target");

        System.out.println(g.toJson(collection));
    }

    private static boolean compare(int[] a, int[] b){
        return (a[0] == b[0] && a[1] == b[1]);
    }

    private static int[] vector(ExampleNode a, ExampleNode b){
        return new int[]{
            b.getxPosition() - a.getxPosition(),
            b.getyPosition() - a.getyPosition()
        };
    }

    private static Collection toReal(List<ExampleNode> array){
        Collection oof = new ArrayList<>();

        array.forEach((node) -> {
            oof.add(new int[]{
                node.getxPosition() * gridRess,
                node.getyPosition() * gridRess
            });
        });

        return oof;
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

    private static void findPointEx(JsonArray array){
        Collection collection = new ArrayList();
        collection.add(g.fromJson(array.get(1), int.class));
        Point in = g.fromJson(array.get(2), Point.class);

        in.x = Math.round(in.x / gridRess);
        in.y = Math.round(in.y / gridRess);
        Point res = findPoint(in.x, in.y);

        if(res != null)
        res.set(
            res.x * gridRess,
            res.y * gridRess
        );
        
        collection.add(res);
        System.out.println(g.toJson(collection));
    }

    private static Point randPos(int dS){
        int dX = (int) (Math.random() * (resGcW - 2 * dS - 1)) + resGcA;
        int dY = (int) (Math.random() * (resGcW - 2 * dS - 1)) + resGcA;

        for(int x = dX; x < dX + dS; x++){
            for(int y = dY; y < dY + dS; y++){
                
                if(!myMap.isWalkableAt(x, y)) return null;
            }
        }

        return new Point(dX, dY);
    }

    private static void findFreePos(JsonArray array){
        Collection collection = new ArrayList();
        collection.add(g.fromJson(array.get(1), int.class));
        int dS = g.fromJson(array.get(2), JustDs.class).dS;
        Point res = null;

        while(res == null){
            Point ret = randPos(dS);
            if(ret != null) res = ret;
        }

        collection.add(res);
        System.out.println(g.toJson(collection));
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
                    case "findPointEx":
                        findPointEx(array);
                    break;
                    case "findFreePos":
                        findFreePos(array);
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

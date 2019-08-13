package uwu;

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public final class App {

    static int gameHalf = 10000 / 2;
    static int attackRadius = 150;
    static int gameORadius = 180;
    static int gameOHealRadius = 150;

    static Gson g;
    static CollMess mess;

    public static void main(String[] args) {
        g = new Gson();

        startThatShit();
        readUntilYouDieFaggot();
    }

    private static void startThatShit(){
        
    }

    private static void readUntilYouDieFaggot(){
        BufferedReader buff = new BufferedReader(new InputStreamReader(System.in));
            
        while(true){
            try {
                String json = buff.readLine();
                mess = g.fromJson(json, CollMess.class);
                collide();

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private static void collide(){
        List<Integer> sect1 = new ArrayList<>();
        List<Integer> sect2 = new ArrayList<>();
        List<Integer> sect3 = new ArrayList<>();
        List<Integer> sect4 = new ArrayList<>();
        List<Integer> sect11 = new ArrayList<>();
        List<Integer> sect22 = new ArrayList<>();
        List<Integer> sect33 = new ArrayList<>();
        List<Integer> sect44 = new ArrayList<>();

        for(Map.Entry<Integer, AntO> a : mess.antO.entrySet()){
            AntO antO = a.getValue();
            int i = a.getKey();

            int x = antO.x + antO.r,
                y = antO.y + antO.r;

            if (x < gameHalf) {
                if (y < gameHalf) sect1.add(i);
                else sect3.add(i);
            } else {
                if (y < gameHalf) sect2.add(i);
                else sect4.add(i);
            }
        }

        for(Map.Entry<Integer, GameO> g : mess.gameO.entrySet()){
            GameO gO = g.getValue();
            int i = g.getKey();

            int x = gO.x,
                y = gO.y,
                r = gO.r * 2;

            if (x <= gameHalf && y <= gameHalf) { // 1
                sect11.add(i);
            }
            if ((x > gameHalf || x + r > gameHalf) && y <= gameHalf) { // 2
                sect22.add(i);
            }
            if (x <= gameHalf && (y > gameHalf || y + r > gameHalf)) { // 3
                sect33.add(i);
            }
            if ((x > gameHalf || x + r > gameHalf) && (y > gameHalf || y + r > gameHalf)) { // 4
                sect44.add(i);
            }
        }

        collF(sect1, sect11);
        collF(sect2, sect22);
        collF(sect3, sect33);
        collF(sect4, sect44);

        System.out.println(g.toJson(mess));
    }

    private static void collF(List<Integer> ar, List<Integer> gr) { // ant id, gameO id
        int s = ar.size();
        for (int i = 0; i < s; i++) {
            for (int j = i + 1; j < s; j++) {
                movingCircleCollision(ar.get(i), ar.get(j));
            }
            
            int s1 = gr.size();
            for (int k = 0; k < s1; k++) {
                circleCollision(ar.get(i), gr.get(k));
            }
        }
    }

    private static void movingCircleCollision(int a1, int a2) { // ant id, ant id
        int combinedRadii, xSide, ySide;
        double overlap;
        V s = new V();
        AntO c1 = mess.antO.get(a1);
        AntO c2 = mess.antO.get(a2);

        s.vx = (c2.x + c2.r) - (c1.x + c1.r);
        s.vy = (c2.y + c2.r) - (c1.y + c1.r);

        s.magnitude = Math.sqrt(s.vx * s.vx + s.vy * s.vy);

        if(s.magnitude < attackRadius && !c2.o.equals(c1.o)){
            c1.at = c2.id;
            c2.at = c1.id;
        }

        combinedRadii = c1.r + c2.r;

        if (s.magnitude < combinedRadii) {

            overlap = combinedRadii - s.magnitude;

            overlap += 1;

            s.dx = s.vx / s.magnitude;
            s.dy = s.vy / s.magnitude;

            s.vxHalf = Math.abs(s.dx * overlap / 2);
            s.vyHalf = Math.abs(s.dy * overlap / 2);

            xSide = (c1.x > c2.x) ? 1 : -1;
            ySide = (c1.y > c2.y) ? 1 : -1;

            c1.x = (int) (c1.x + (s.vxHalf * xSide));
            c1.y = (int) (c1.y + (s.vyHalf * ySide));
            c2.x = (int) (c2.x + (s.vxHalf * -xSide));
            c2.y = (int) (c2.y + (s.vyHalf * -ySide));

            c1.xx += s.vxHalf * xSide;
            c1.yy += s.vyHalf * ySide;
            c2.xx += s.vxHalf * -xSide;
            c2.yy += s.vyHalf * -ySide;

            c1.hit.add(new Hit("a", c2.id));
            c2.hit.add(new Hit("a", c1.id));
        }

        // setnu to zpět protože java
        mess.antO.put(a1, c1);
        mess.antO.put(a2, c2);
    }

    private static void circleCollision(int a, int g) { // ant, gameO
        int combinedRadii;
        double overlap;
        V s = new V();
        AntO c1 = mess.antO.get(a);
        GameO c2 = mess.gameO.get(g);

        s.vx = (c2.x + c2.r) - (c1.x + c1.r);
        s.vy = (c2.y + c2.r) - (c1.y + c1.r);

        s.magnitude = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        
        // attackuje jenom cizí
        if(c2.dmg && s.magnitude < gameORadius && !c1.o.equals(c2.o)){
            c2.at = c1.id; // attack nastavuju jenom gameO
        }

        // healuje jenom svoje
        if(c2.heal && s.magnitude < gameOHealRadius && c1.o.equals(c2.o)){
            c2.he.add(c1.id); // heal nastavuju jenom gameO
        }

        combinedRadii = c1.r + c2.r;

        if (s.magnitude < combinedRadii) {

            overlap = combinedRadii - s.magnitude;

            overlap += 0.3;

            s.dx = s.vx / s.magnitude;
            s.dy = s.vy / s.magnitude;

            c1.x -= overlap * s.dx;
            c1.y -= overlap * s.dy;

            c1.xx -= overlap * s.dx;
            c1.yy -= overlap * s.dy;

            c1.hit.add(new Hit("g", c2.id));
        }

        // setnu to zpět protože java
        mess.antO.put(a, c1);
        mess.gameO.put(g, c2);
    }

    private static class V {
        public int vx;
        public int vy;
        public double vxHalf;
        public double vyHalf;
        public double dx;
        public double dy;
        public double magnitude;
    }
}

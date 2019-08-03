package uwu;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;

public class CollMess {
    // public List<GameO> gameO;
    // public List<AntO> antO;
    public Map<Integer, GameO> gameO;
    public Map<Integer, AntO> antO;

    public String toString(){
        String oof = "";

        // for (GameO g : gameO) {
        //     oof += "{g: " + g.id + "}";
        // }
        // for (AntO a : antO) {
        //     for(Hit h : a.hit){
        //         oof += "{a: " + h.t + ", " + h.id + "}";
        //     }
        // }

        // for(Map.Entry<Integer, GameO> gO : gameO.entrySet()){

        // }

        return oof;
    }
}

class GameO {
    public int id;
    public int x;
    public int y;
    public int r;
    public String o;
    public boolean dmg;
    public boolean heal;

    public int at;
    public List<Integer> he;

    public GameO(){
        this.he = new ArrayList<Integer>();
    }
}

class AntO {
    public int id;
    public int x;
    public int y;
    public int r;
    public String o;

    public int xx;
    public int yy;
    public List<Hit> hit;
    public int at;

    public AntO(){
        this.hit = new ArrayList<Hit>();
    }
}

class Hit {
    public String t;
    public int id;

    public Hit(String t, int  id){
        this.t = t;
        this.id = id;
    }
}
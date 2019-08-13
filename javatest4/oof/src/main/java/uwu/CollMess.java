package uwu;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;

public class CollMess {
    public Map<Integer, GameO> gameO;
    public Map<Integer, AntO> antO;
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
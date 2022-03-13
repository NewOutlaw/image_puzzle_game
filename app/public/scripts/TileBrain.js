import Tile from "/scripts/Tile.js";

export default class TileBrain 
{
    constructor()
    {
        var tiletest = new Tile();
        tiletest.setCurrentX = 69;
        console.log(tiletest.getCurrentX);
    }
}
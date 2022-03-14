import Tile from "/scripts/Tile.js";

export default class TileBrain 
{
    #fieldSize;
    #imgPath;
    #tiles = [];

    constructor(fieldSize, imgPath)
    {
        this.#fieldSize = fieldSize;
        this.#imgPath = imgPath;

        for(var y = 0; y < this.#fieldSize; y++)
            for(var x = 0; x < this.#fieldSize; x++)
            {
                this.#tiles.push(new Tile((x*-100).toString() + 'px', (y*-100).toString() + 'px', x, y));
            }

        this.shuffle();
        this.putTilesInDocument();


        /*var tiletest = new Tile();
        tiletest.setCurrentX = 69;
        console.log(tiletest.getCurrentX);*/
    }

    shuffle()
    {
        var shuffledTiles = [];

        this.#tiles.forEach(tile => {
            while(true)
            {
                let possibleX = Math.floor(Math.random() * this.#fieldSize);
                let possibleY = Math.floor(Math.random() * this.#fieldSize);

                var alreadyInPlace = shuffledTiles.filter(t => t.currentX == possibleX && t.currentY == possibleY);
                if(alreadyInPlace.length == 0)
                {
                    tile.currentX = possibleX;
                    tile.currentY = possibleY;
                    shuffledTiles.push(tile);
                    break;
                }
            }
        });
        
        shuffledTiles.forEach(tile => console.log("tileId: " + tile.tileId + "\tcurrentX: " + tile.currentX + "\tcurrentY: " + tile.currentY + 
           "\tsolvedX: " + tile.solvedX + "\tsolvedY: " + tile.solvedY));
    }

    putTilesInDocument()
    {
        this.#tiles.forEach(tile => {
            //console.log("tileId: " + tile.tileId + "\tmargin-left: " + tile.marginLeft + "\tmargin-top: " + tile.marginTop + 
            //    "\tsolvedX: " + tile.solvedX + "\tsolvedY: " + tile.solvedY);

            var outerDiv = document.createElement('div');
            outerDiv.setAttribute('class', 'tile');
            outerDiv.setAttribute('id', tile.tileId);
            outerDiv.setAttribute('x', tile.currentX);
            outerDiv.setAttribute('y', tile.currentY);
            outerDiv.setAttribute('style', `--x: ${tile.currentX}; --y: ${tile.currentY}`);

            var innerImg = document.createElement('img');
            innerImg.setAttribute('src', this.#imgPath);
            innerImg.setAttribute('posx', tile.marginLeft);
            innerImg.setAttribute('posy', tile.marginTop);
            innerImg.setAttribute('style', `--posx: ${tile.marginLeft}; --posy: ${tile.marginTop}`);

            outerDiv.appendChild(innerImg);
            document.getElementById('field').appendChild(outerDiv);
        });
    }

    get tiles()
    {
        var tilesClasses = document.getElementsByClassName("tile")
        return Array.from(tilesClasses);
    }
}
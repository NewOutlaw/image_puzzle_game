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
        
        //shuffledTiles.forEach(tile => console.log("tileId: " + tile.tileId + "\tcurrentX: " + tile.currentX + "\tcurrentY: " + tile.currentY + 
        //   "\tsolvedX: " + tile.solvedX + "\tsolvedY: " + tile.solvedY));
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

    moveTile(eventcode)
    {
        if(eventcode === 'ArrowUp')
            for(var i = 0; i < this.#tiles.length; i++)
            {
                let tx = this.#tiles[i].currentX;
                let ty = this.#tiles[i].currentY;
                let emptySpace = this.#findEmptySpace();
                if(ty > 0 && tx == emptySpace.x && ty - 1 == emptySpace.y)
                {
                    this.#moveTile(this.#tiles[i].tileId, emptySpace.x, emptySpace.y);
                    break;
                }
            };

        if(eventcode === 'ArrowDown')
            for(var i = 0; i < this.#tiles.length; i++)
            {
                //console.log("Arrow down: current tile: x" + this.#tiles[i].currentX + " y" + this.#tiles[i].currentY);

                let tx = this.#tiles[i].currentX;
                let ty = this.#tiles[i].currentY;
                let emptySpace = this.#findEmptySpace();
                
                if((ty <= this.#fieldSize - 2 && tx == emptySpace.x && ty + 1 == emptySpace.y) || 
                    (tx == this.#fieldSize - 1 && ty == this.#fieldSize - 1 && emptySpace.y == this.#fieldSize))
                    {
                        this.#moveTile(this.#tiles[i].tileId, emptySpace.x, emptySpace.y);
                        break;
                    }
            };

        if(eventcode === 'ArrowLeft')
            for(var i = 0; i < this.#tiles.length; i++)
            {
                let tx = this.#tiles[i].currentX;
                let ty = this.#tiles[i].currentY;
                let emptySpace = this.#findEmptySpace();
                if(tx > 0 && tx - 1 == emptySpace.x && ty == emptySpace.y)
                {
                    this.#moveTile(this.#tiles[i].tileId, emptySpace.x, emptySpace.y);
                    break;
                }
            };

        if(eventcode === 'ArrowRight') 
            for(var i = 0; i < this.#tiles.length; i++)
            {
                let tx = this.#tiles[i].currentX;
                let ty = this.#tiles[i].currentY;
                let emptySpace = this.#findEmptySpace();
                if(tx <= this.#fieldSize - 2 && tx + 1 == emptySpace.x && ty == emptySpace.y)
                {
                    this.#moveTile(this.#tiles[i].tileId, emptySpace.x, emptySpace.y);
                    break;
                }
            };
    }

    #findEmptySpace()
    {
        let emptyX = this.#fieldSize - 1;
        let emptyY = this.#fieldSize;

        for(let y = 0; y < this.#fieldSize; y++)
        {
            for(let x = 0; x < this.#fieldSize; x++)
            {
                var tileThere = this.#tiles.filter(tile => tile.currentX == x && tile.currentY == y);
                if(tileThere.length == 0)
                {
                    emptyX = x;
                    emptyY = y;
                    break;
                }
            }
            if(emptyY < this.#fieldSize)
                break;
        }

        //console.log("empty space: x" + emptyX + " y" + emptyY);
        return { x: emptyX, y: emptyY};
    }

    #moveTile(tileToMoveId, toX, toY)
    {
        //console.log("moveit: x" + toX + " y" + toY);
        this.#tiles.forEach(tile => {
            if(tile.tileId == tileToMoveId)
            {
                tile.currentX = toX;
                tile.currentY = toY;
            }
        });

        let element = document.getElementById(tileToMoveId);
        element.setAttribute('x', toX);
        element.setAttribute('y', toY);
        element.style = `--x: ${toX}; --y: ${toY}`;
    }

    get tiles()
    {
        var tilesClasses = document.getElementsByClassName("tile")
        return Array.from(tilesClasses);
    }
}
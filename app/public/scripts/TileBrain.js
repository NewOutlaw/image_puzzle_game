import Tile from "/scripts/Tile.js";

export default class TileBrain 
{
    #isShuffling = false;
    #fieldSize;
    #imgPath;
    #shuffleDepth;
    #transTime;
    #tiles = [];

    constructor(fieldSize, imgPath, shuffleDepth, transTime)
    {
        this.#fieldSize = fieldSize;
        this.#imgPath = imgPath;
        this.#shuffleDepth = shuffleDepth;
        this.#transTime = transTime;

        for(var y = 0; y < this.#fieldSize; y++)
            for(var x = 0; x < this.#fieldSize; x++)
            {
                this.#tiles.push(new Tile((x*-100).toString() + 'px', (y*-100).toString() + 'px', x, y));
            }

        this.putTilesInDocument();
        //this.shuffle();


        /*var tiletest = new Tile();
        tiletest.setCurrentX = 69;
        console.log(tiletest.getCurrentX);*/
    }

    shuffle()
    {
        this.#isShuffling = true;
        //console.log("tt: " + this.#transTime + " " + typeof this.#transTime);
        var tt = this.#transTime * 1000;
        console.log(tt);
        var counter = 0;
        var shuffleIntervall = setInterval(() => 
        {
            var directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
            var x = Math.floor(Math.random() * 4);

            console.log(x);

            this.moveTile(directions[x]);
            counter++;

            if(counter > this.#shuffleDepth)
            {
                clearInterval(shuffleIntervall);
                this.#isShuffling = false;
            }

        }, this.#transTime * 1000);
        
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
        for(const tile of this.#tiles)
        {
            let tileX = tile.currentX;
            let tileY = tile.currentY;
            let emptySpace = this.#findEmptySpace();

            var move_done = false;
            
            switch(eventcode)
            {
                case 'ArrowUp':
                    if(tileY > 0 && tileX == emptySpace.x && tileY - 1 == emptySpace.y)
                    {
                        this.#moveTile(tile.tileId, emptySpace.x, emptySpace.y); 
                        move_done = true;
                    }
                    break;

                case 'ArrowDown':
                    if((tileY <= this.#fieldSize - 2 && tileX == emptySpace.x && tileY + 1 == emptySpace.y) || (tileX == this.#fieldSize - 1 && tileY == this.#fieldSize - 1 && emptySpace.y == this.#fieldSize))
                    {
                        this.#moveTile(tile.tileId, emptySpace.x, emptySpace.y); 
                        move_done = true;
                    }
                    break;

                case 'ArrowLeft':
                    if(tileX > 0 && tileX - 1 == emptySpace.x && tileY == emptySpace.y)
                    {
                        this.#moveTile(tile.tileId, emptySpace.x, emptySpace.y); 
                        move_done = true;
                    }
                    break;

                case 'ArrowRight':
                    if(tileX <= this.#fieldSize - 2 && tileX + 1 == emptySpace.x && tileY == emptySpace.y)
                    {
                        this.#moveTile(tile.tileId, emptySpace.x, emptySpace.y); 
                        move_done = true;
                    }
                    break;
            } 
            
            if(move_done)
                break;

        };
    }


    #isItSolved()
    {
        if(this.#isShuffling)
            return;

        var solved = true;
        this.#tiles.forEach(tile => 
        {
            if(tile.currentX != tile.solvedX || tile.currentY != tile.solvedY)
            {
                solved = false;
                return;
            }
        });

        if(solved)
        {
            setTimeout(() => {
                console.log("WINNER WINNER CHICKEN DINNER");
                window.alert("WINNER WINNER CHICKEN DINNER");
            }, 200);
        }
        else
            console.log("nope");
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
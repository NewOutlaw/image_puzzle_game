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

        this.#tiles.forEach(element => {
            //console.log("tileId: " + element.tileId + "\tmargin-left: " + element.marginLeft + "\tmargin-top: " + element.marginTop + 
            //    "\tsolvedX: " + element.solvedX + "\tsolvedY: " + element.solvedY);

            var outerDiv = document.createElement('div');
            outerDiv.setAttribute('class', 'tile');
            outerDiv.setAttribute('id', element.tileId);
            outerDiv.setAttribute('x', element.currentX);
            outerDiv.setAttribute('y', element.currentY);
            outerDiv.setAttribute('style', `--x: ${element.currentX}; --y: ${element.currentY}`);

            var innerImg = document.createElement('img');
            innerImg.setAttribute('src', this.#imgPath);
            innerImg.setAttribute('posx', element.marginLeft);
            innerImg.setAttribute('posy', element.marginTop);
            innerImg.setAttribute('style', `--posx: ${element.marginLeft}; --posy: ${element.marginTop}`);

            outerDiv.appendChild(innerImg);
            document.getElementById('field').appendChild(outerDiv);
        });

        /*var tiletest = new Tile();
        tiletest.setCurrentX = 69;
        console.log(tiletest.getCurrentX);*/
    }

    get tiles()
    {
        var tilesClasses = document.getElementsByClassName("tile")
        return Array.from(tilesClasses);
    }
}
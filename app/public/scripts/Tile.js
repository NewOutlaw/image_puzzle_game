export default class Tile {

    #fieldSize;
    #marginTop;
    #marginLeft;
    #solvedX;
    #solvedY;
    #currentX;
    #currentY;

    constructor(fieldSize, marginTop, marginLeft, solvedX, solvedY, currentX, currentY)
    {
        this.fieldSize = fieldSize;
        this.marginTop = marginTop;
        this.marginLeft = marginLeft;
        this.solvedX = solvedX;
        this.solvedY = solvedY;
        this.currentX = currentX;
        this.currentY = currentY;
    }

    set setCurrentX(x)
    {
        this.#currentX = x;
    }

    get getCurrentX()
    {
        return this.#currentX;
    }

    set setCurrentY(y)
    {
        this.#currentY = y;
    }

}
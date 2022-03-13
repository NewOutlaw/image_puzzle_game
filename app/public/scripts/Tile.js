
export default class Tile {

    #tileId;
    #marginTop;
    #marginLeft;
    #solvedX;
    #solvedY;
    #currentX;
    #currentY;

    constructor(marginLeft, marginTop, solvedX, solvedY)
    {
        this.#tileId = Math.random().toString().split('.')[1];
        this.#marginTop = marginTop;
        this.#marginLeft = marginLeft;
        this.#solvedX = solvedX;
        this.#solvedY = solvedY;
        this.#currentX = this.#solvedX;
        this.#currentY = this.#solvedY;
    }

    set currentX(x)
    {
        this.#currentX = x;
    }

    get currentX()
    {
        return this.#currentX;
    }

    set currentY(y)
    {
        this.#currentY = y;
    }

    get currentY()
    {
        return this.#currentY;
    }

    get tileId()
    {
        return this.#tileId;
    }

    get marginTop()
    {
        return this.#marginTop;
    }

    get marginLeft()
    {
        return this.#marginLeft;
    }
    
    get solvedX()
    {
        return this.#solvedX;
    }

    get solvedY()
    {
        return this.#solvedY;
    }

    get tileId()
    {
        return this.#tileId;
    }

}   
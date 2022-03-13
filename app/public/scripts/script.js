import Tile from "/scripts/Tile.js";

var tiletest = new Tile();
console.log(tiletest.getFoo());

var fieldSizePx = window.getComputedStyle(document.documentElement).getPropertyValue('--field-size');
var tileSizePx = window.getComputedStyle(document.documentElement).getPropertyValue('--tile-size');
var fieldSizeCount = extractNumber(fieldSizePx, 'px') / extractNumber(tileSizePx, 'px');

var transTime = extractNumber(window.getComputedStyle(document.documentElement).getPropertyValue('--trans-time'), 's');

var tile = document.getElementById("tile")
tile.setAttribute('starttime', Date.now());
//tile.style.setProperty('--x', Math.floor(Math.random() * fieldSizeCount));
//tile.style.setProperty('--y', Math.floor(Math.random() * fieldSizeCount));

window.addEventListener("keydown", event => {
    let x = tile.style.getPropertyValue('--x');
    let y = tile.style.getPropertyValue('--y');

    if(event.code === 'ArrowUp')
        if(isTimingOk(tile) && y > 0 )
            tile.style.setProperty('--y', +y - +1);
    if(event.code === 'ArrowDown')
        if(isTimingOk(tile) && (y < fieldSizeCount - 1 || x == fieldSizeCount - 1 && y == fieldSizeCount - 1))
            tile.style.setProperty('--y', +y + +1);
    if(event.code === 'ArrowLeft')
        if(isTimingOk(tile) && x > 0 && y < fieldSizeCount)
            tile.style.setProperty('--x', +x - +1);
    if(event.code === 'ArrowRight')
        if(isTimingOk(tile) && x < fieldSizeCount - 1)
            tile.style.setProperty('--x', +x + +1);
});

function isTimingOk(tile)
{
    if(Date.now() - parseInt(tile.getAttribute('starttime')) >= transTime*1000)
    {
        tile.setAttribute('starttime', Date.now());
        return true;
    }
    else
        return false;
}

function extractNumber(value, appendedUnit)
{
    if(value.includes('.'))
        return parseFloat(value.split(appendedUnit)[0]);
    else
        return parseInt(value.split(appendedUnit)[0]);
}

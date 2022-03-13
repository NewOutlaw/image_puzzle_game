import TileBrain from "/scripts/TileBrain.js";


var fieldSizePx = window.getComputedStyle(document.documentElement).getPropertyValue('--field-size');
var tileSizePx = window.getComputedStyle(document.documentElement).getPropertyValue('--tile-size');
var fieldSizeCount = extractNumber(fieldSizePx, 'px') / extractNumber(tileSizePx, 'px');
var timestamp = Date.now();
var imgPath = '/img/moonlanding.jpg';

var tileBrain = new TileBrain(fieldSizeCount, imgPath);



window.addEventListener("keydown", event => {
    if(!isTimingOk())
    return;

    if(event.code === 'ArrowUp')
        tiles.forEach(tile => 
        {
            let y = tile.style.getPropertyValue('--y');
            if(y > 0 )
                tile.style.setProperty('--y', +y - +1);
        });

    if(event.code === 'ArrowDown')
        tiles.forEach(tile => 
        {
            let x = tile.style.getPropertyValue('--x');
            let y = tile.style.getPropertyValue('--y');
            if(y < fieldSizeCount - 1 || x == fieldSizeCount - 1 && y == fieldSizeCount - 1)
                tile.style.setProperty('--y', +y + +1);
        });

    if(event.code === 'ArrowLeft')
        tiles.forEach(tile => 
        {
            let x = tile.style.getPropertyValue('--x');
            let y = tile.style.getPropertyValue('--y');
            if(x > 0 && y < fieldSizeCount)
                tile.style.setProperty('--x', +x - +1);
        });

    if(event.code === 'ArrowRight')
        tiles.forEach(tile => 
        {
            let x = tile.style.getPropertyValue('--x');
            if(x < fieldSizeCount - 1)
                tile.style.setProperty('--x', +x + +1);
        });
});

function isTimingOk()
{    
    var transTime = extractNumber(window.getComputedStyle(document.documentElement).getPropertyValue('--trans-time'), 's');

    if(Date.now() - timestamp >= transTime*1000)
    {
        timestamp = Date.now();
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

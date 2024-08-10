import TileBrain from "./TileBrain.js";


var fieldLength = 4;
var shuffleDepth = 200;
var transTime = extractNumber(window.getComputedStyle(document.documentElement).getPropertyValue('--trans-time'), 's');

var rootReadOnly = window.getComputedStyle(document.documentElement);
var root = document.documentElement.style;
root.setProperty('--field-size', fieldLength * parseInt(rootReadOnly.getPropertyValue('--tile-size').split('px')[0]) + 'px');

var fieldSizePx = window.getComputedStyle(document.documentElement).getPropertyValue('--field-size');
var tileSizePx = window.getComputedStyle(document.documentElement).getPropertyValue('--tile-size');
var fieldSizeCount = extractNumber(fieldSizePx, 'px') / extractNumber(tileSizePx, 'px');
var timestamp = Date.now();

var imgPath = '/img/moonlanding.jpg';
//var imgPath = '/img/starwars.jpg';

var tileBrain = new TileBrain(fieldSizeCount, imgPath, shuffleDepth, transTime);

document.getElementById("shuffle-btn").addEventListener("click", (e) => 
{
    tileBrain.shuffle();
});

window.addEventListener("keydown", event => 
{
    if(!isTimingOk())
        return;
    else
        tileBrain.moveTile(event.key);
});

var touchStart;
var touchEnd;
document.body.addEventListener('touchstart', (e) => 
{
    touchStart = e.touches[0];
});
document.body.addEventListener('touchmove', (e) => 
{
    touchEnd = e.touches[e.touches.length-1];
});
document.body.addEventListener('touchend', (e) => 
{
    tileBrain.moveTile(getDirectionFromSwipe(touchStart, touchEnd));
});

function getDirectionFromSwipe(first, second)
{
    var xSwipe = second.screenX - first.screenX;
    var ySwipe = second.screenY - first.screenY;

    if(Math.abs(xSwipe) > Math.abs(ySwipe))
    {
        if(xSwipe > 0)
            return "ArrowRight";
        else
            return "ArrowLeft";
    }
    else
    {
        if(ySwipe > 0)
            return "ArrowDown";
        else
            return "ArrowUp";
    }
}

function isTimingOk()
{    
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

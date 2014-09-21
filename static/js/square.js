var canvas = new fabric.Canvas('canvas');
canvas.observe('mouse:down', function(e) { mousedown(e); });
canvas.observe('mouse:move', function(e) { mousemove(e); });
canvas.observe('mouse:up', function(e) { mouseup(e); });

var started = false;
var x = 0;
var y = 0;

/* Mousedown */
function mousedown(e) {
    var mouse = canvas.getPointer(e.memo.e);
    started = true;
    x = mouse.x;
    y = mouse.y;

    var square = new fabric.Rect({
        width: 0,
        height: 0,
        left: x,
        top: y,
        fill: '#000'
    });

    canvas.add(square);
    canvas.renderAll();
    canvas.setActiveObject(square);

}


/* Mousemove */
function mousemove(e) {
    if(!started) {
        return false;
    }

    var mouse = canvas.getPointer(e.memo.e);

    var w = Math.abs(mouse.x - x),
    h = Math.abs(mouse.y - y);

    if (!w || !h) {
        return false;
    }

    var square = canvas.getActiveObject();
    square.set('width', w).set('height', h);
    canvas.renderAll();
}

/* Mouseup */
function mouseup(e) {
    if(started) {
        started = false;
    }

    var square = canvas.getActiveObject();

    canvas.add(square);
    canvas.renderAll();
 }

var canvas;
$(function () {
  canvas = window._canvas = new fabric.Canvas('c');
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
  canvas.renderAll();

  $("#btnAddText").click(function(){
    var text = new fabric.IText('()', {
      fontFamily: 'consolas',
      left: 30,
      top: 30 ,
      fontSize: 40,
    });

    canvas.add(text);

});

  $("#btnAddLine").click(function(){
    canvas.add(new fabric.Line([50, 50, 200, 0], {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 0.4,
        hasControls: true,
        hasRotatingPoint: true,
        padding: 10,
        left: 80,
        top: 50,
        scaleX: 3,
        scaleY: 3
    }));
});
 $("#btnAddsqrt").click(function(){
    fabric.Image.fromURL('/static/img/sqrt.png', function(img) {
      var oImg = img.set({ left: 30, top: 30, }).scale(0.9);
      canvas.add(oImg).renderAll();
      canvas.item(0).hasRotatingPoint = false;
      canvas.setActiveObject(oImg);

    });

});

$("#btnAddpentagon").click(function(){
    fabric.Image.fromURL('/static/img/ed_pentagon.png', function(img) {
      var oImg = img.set({ left: 30, top: 30, }).scale(0.9);
      canvas.add(oImg).renderAll();
      canvas.item(0).hasRotatingPoint = false;
      canvas.setActiveObject(oImg);

    });

});

$("#btnAddcircle").click(function(){
    fabric.Image.fromURL('/static/img/ed_circle.png', function(img) {
      var oImg = img.set({ left: 30, top: 30, }).scale(0.9);
      canvas.add(oImg).renderAll();
      canvas.item(0).hasRotatingPoint = false;
      canvas.setActiveObject(oImg);

    });

});

$("#btnAddhexagon").click(function(){
    fabric.Image.fromURL('/static/img/ed_hexagon.png', function(img) {
      var oImg = img.set({ left: 30, top: 30, }).scale(0.9);
      canvas.add(oImg).renderAll();
      canvas.item(0).hasRotatingPoint = false;
      canvas.setActiveObject(oImg);

    });

});

$("#btnAddtriangle").click(function(){
    fabric.Image.fromURL('/static/img/ed_triangle.png', function(img) {
      var oImg = img.set({ left: 30, top: 30, }).scale(0.9);
      canvas.add(oImg).renderAll();
      canvas.item(0).hasRotatingPoint = false;
      canvas.setActiveObject(oImg);

    });

});

$("#btnAddsquare").click(function(){
    fabric.Image.fromURL('/static/img/ed_square.png', function(img) {
      var oImg = img.set({ left: 30, top: 30, }).scale(0.9);
      canvas.add(oImg).renderAll();
      canvas.item(0).hasRotatingPoint = false;
      canvas.setActiveObject(oImg);

    });

});

$("#btnAddgraph").click(function(){
    fabric.Image.fromURL('/static/img/graph.png', function(img) {
      var oImg = img.set({ left: 30, top: 30, }).scale(0.9);
      canvas.add(oImg).renderAll();
      canvas.item(0).hasRotatingPoint = false;
      canvas.setActiveObject(oImg);

    });

});



$("#btnAddfow").click(function(){
    var fow = new fabric.IText('num', {
  fontFamily: 'consolas',
  left: 30,
  top: 30 ,
  fontSize: 10,
});
  fow.hasControls = false;
  canvas.add(fow);
});

$("#btnClear").click(function(){
    canvas.clear().renderAll();
});

var deleteSelectedObject = document.getElementById('delete-item');
deleteSelectedObject.onclick = function()
{
if(canvas.getActiveGroup()){
      canvas.getActiveGroup().forEachObject(function(o){ canvas.remove(o) });
      canvas.discardActiveGroup().renderAll();
    } else {
      canvas.remove(canvas.getActiveObject());
    }
};

document.getElementById('freedraw').addEventListener('click', function () {
    canvas.isDrawingMode = !canvas.isDrawingMode;
    canvas.freeDrawingBrush.width = 5;
});
document.getElementById('colorpicker').addEventListener('change', function (e) {
    console.log(e.target.value);
    canvas.freeDrawingBrush.color = e.target.value;
});

});

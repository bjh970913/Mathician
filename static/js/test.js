var canvas;
$(function () {
  canvas = this._canvas = new fabric.Canvas('c');
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

});

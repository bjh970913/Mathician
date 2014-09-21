(function() {
  var canvas = this.__canvas = new fabric.Canvas('c');
  fabric.Object.prototype.transparentCorners = false;

  fabric.Image.fromURL('sqrt.png', function(img) {
      var oImg = img.set({ left: 300, top: 300, }).scale(0.9);
    canvas.add(oImg).renderAll();
    canvas.item(0).hasRotatingPoint = false;
    canvas.setActiveObject(oImg);

      });

  var formula = new fabric.IText('formula',{
    fontFamily: 'consolas',
    fontSize: 50,
  });

  var fow = new fabric.IText('num', {
  fontFamily: 'consolas',
  left: 30,
  top: 30 ,
  fontSize: 20,
});

  canvas.add(fow,formula);
  canvas.item(0).hasControls = canvas.item(0).hasBorders = false;
    canvas.item(1).hasControls = canvas.item(1).hasBorders = false;

  canvas.on({
    'object:moving': onChange,
    'object:scaling': onChange,
    'object:rotating': onChange,
  });

  function onChange(options) {
    options.target.setCoords();
    canvas.forEachObject(function(obj) {
      if (obj === options.target) return;
      obj.setOpacity(options.target.intersectsWithObject(obj) ? 0.5 : 1);
    });
  }
});

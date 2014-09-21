var canvas;

$(function () {
    canvas = window._canvas = new fabric.Canvas('canvas');
    canvas.backgroundColor = '#efefef';

    canvas.renderAll();

    document.getElementById('freedraw').addEventListener('click', function () {
        canvas.isDrawingMode = !canvas.isDrawingMode;
        canvas.freeDrawingBrush.width = 15;
    });

    document.getElementById('colorpicker').addEventListener('change', function (e) {
        console.log(e.target.value);
        canvas.freeDrawingBrush.color = e.target.value;
    });
});

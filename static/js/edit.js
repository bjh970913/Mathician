$(document).ready(function(){
    w = $('#edit').width();
    h = $('#edit').height();

    $('#c').width(w);
    $('#c').height(h);
    $('#c').attr('width', w);
    $('#c').attr('height', h);

    $('#textbox').width(w-17);
    $('#textbox').height(h-17);
    $('#textbox').attr('width', w-17);
    $('#textbox').attr('height', h-17);
    $('#textbox').css('z-index', 10);

    $("#menu2").children().hide();

    $("#btnClear").click(function(){
        $("#textbox").val('')
    });
});
function close_m2(){
    edit['isedit'] = false;
    $("#menu2 div").slideUp();
    $("#menu2").animate({
        width: "220px"
    }, 1500 );
    $("#close").hide();
}
function chmode(){
    if($('#textbox').css('z-index') =="10"){
        $('#chmod').text("M -> T");
        $('#textbox').css('z-index',9);
        $(".canvas-container").css('z-index',10);
    }
    else{
        $('#chmod').text("T -> M");
        $('#textbox').css('z-index',10);
        $(".canvas-container").css('z-index',9);
    }
}
function formula(){
    $("#menu2 div").slideUp();
    $("#menu2").animate({
        width: "220px"
    }, 1500 );
    $('#menu2').css('z-index',11);
    $('#formula').slideDown();
    $("#close").show();
}
function insert_formula(){
    img=$("canvas.mathdoxformula")[0].toDataURL("image/png");
    fabric.Image.fromURL(img, function(img) {
        var oImg = img.set({ left: 30, top: 30, }).scale(0.9);
        canvas.add(oImg).renderAll();
        canvas.item(0).hasRotatingPoint = false;
        canvas.setActiveObject(oImg);
    });
    close_m2();
}
function shape(){
    $("#menu2 div").slideUp();
    $("#menu2").animate({
        width: "220px"
    }, 1500 );
    $("#shape").slideDown();
    $("#close").show();
}
function draw(){
    $("#menu2 div").slideUp();
    $("#menu2").animate({
        width: "220px"
    }, 1500 );
    $("#draw").slideDown();
    $("#close").show();
}
function text(){
    $("#menu2 div").slideUp();
    $("#menu2").animate({
        width: "220px"
    }, 1500 );
    $('#menu2').css('z-index',11);
    $("#addtext").slideDown();
    $("#close").show();
}
function add_text(){
    size=$('#fontsize').val()
    if($('#edittext').val().length==0)
    {
        alert("Plese enter text");
        return false;
    }
    if(isNaN(size))
    {
        alert("Plese enter numbers only");
        return false;
    }
    if(edit['isedit'])
    {
        ob = edit['object'];
        ob.text = $('#edittext').val();
        ob.fontSize = size;
        canvas.renderAll();
        edit['isedit'] = false;
        close_m2();
    }
    else
    {
        var text = new fabric.IText($('#edittext').val(), {
        fontFamily: 'consolas',
        left: 530,
        top: 330 ,
        fontSize: Number(size),
        });
        canvas.add(text);
        close_m2();
    }
}
function save(){
    if($('#title').val()=="")
    {
        alert("Plese enter title");
        return false;
    }
    title = $('#title').val();
    img=$("#c")[0].toDataURL("image/png");
    //$("#menu2").append("<img src='"+img+"''>")
    $("#context").val(img)
    $("#save_form")[0].submit()
}
function new_text()
{
    $('#edittext').val('')
    $('#edittext').val('')
}

/*
var edit = {isedit:false}

fabric.IText.prototype.enterEditing=function(){
    this.canvas && this.canvas.renderAll();
    $('#edittext').val(this.text)
    edit['isedit'] = true;
    edit['object'] = this;
    text();
    return this
}
*/

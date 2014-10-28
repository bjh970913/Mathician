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
function graph(){
    $("#menu2 div").slideUp();
    $("#menu2").animate({
        width: "220px"
    }, 1500 );
    $("#graph").slideDown();
    $("#close").show();
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
    if(!edit['isedit']){

        $("#menu2 div").slideUp();
        $("#menu2").animate({
            width: "220px"
        }, 1500 );
        $('#menu2').css('z-index',11);
        $("#addtext").slideDown();
    }
    $('#menu2').css('z-index',11);
    $("#addtext").show();
    $("#close").show();
}
function add_text(){
    size=$('#fontsize').val()
    if($('#edittext').val().length==0 && !edit['isedit'])
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
        new_text();
        close_m2();
    }
}
function save(){
    if($('#title').val()=="")
    {
        alert("Plese enter title");
        return false;
    }
    if($('#title').val().length>20)
    {
        alert("Too long title: max title length is 20");
        $('#title').val($('#title').val().substr(0,20))
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
    if($('#fontsize').val()==''){
        $('#fontsize').val('20')
    }
    edit['isedit']=false
}

var edit = {isedit:false, object: new Object()}

fabric.IText.prototype.enterEditing=function(){
    this.exitEditingOnOthers();
    this.canvas && this.canvas.renderAll();
    $('#edittext').val(this.text)
    edit['isedit'] = true;
    edit['object'] = this;
    text();
    return this;
}

function text_save(){
    if(edit['isedit'])
    {
        add_text();
    }
}
$(document).ready(function(){
    $('#edittext').change(function(){
        text_save()
    });
    $('#edittext').keydown(function(){
        text_save()
    });
    $('#edittext').change(function(){
        text_save()
    });
    $('#fontsize').keydown(function(){
        text_save()
    });
});

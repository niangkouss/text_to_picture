function $(id) {
    return document.getElementById(id);
}

function textToImg() {
    var len = $('len').value || 30;
    var i = 0;
    var fontSize = $('fontSize').value || 15;
    var fontWeight = $('fontWeight').value || 'normal';
    var txt = $("txt").value;
    var canvas = $('canvas');
    if (txt == '') {
        alert('请输入文字！');
        $("txt").focus();
    }
    if (len > txt.length) {
        len = txt.length;
    }

    canvas.width = fontSize * len; //根据文字计算出所需画布的宽高
    canvas.height = fontSize * (3 / 2) * (Math.ceil(txt.length / len) + txt.split('\n').length - 1);

    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = $("showcolor").innerHTML;//根据用户的设置,设置好canvas的文字的眼屎

    context.font = fontWeight + ' ' + fontSize + 'px sans-serif';
    context.textBaseline = 'top';
    canvas.style.display = 'none';


    function fillTxt(text) {
        while (text.length > len) {
            var txtLine = text.substring(0, len);
            text = text.substring(len);
            context.fillText(txtLine, 0, fontSize * (3 / 2) * i++,
                canvas.width);
        }
        context.fillText(text, 0, fontSize * (3 / 2) * i, canvas.width);
    }

    var txtArray = txt.split('\n');
    for (var j = 0; j < txtArray.length; j++) {//把文字画入画布
        fillTxt(txtArray[j]);
        context.fillText('\n', 0, fontSize * (3 / 2) * i++, canvas.width);
    }
    var img = $("img");
    img.src = canvas.toDataURL("image/png");//画布导出数据用img标签显示
}

function changeColor() {
    var c = $("text");
    var ctx = c.getContext("2d"); //显示当前颜色的画布
    var red = $("red");
    var green = $("green");
    var blue = $("blue");//画布的fileStyle是可以rgba,前三位分别是红绿蓝
    ctx.fillStyle = "rgb(" + red.value + "," + green.value + ","
        + blue.value + ")";
    $("showcolor").innerHTML = ctx.fillStyle;
    ctx.fillRect(0, 0, 100, 100);

}

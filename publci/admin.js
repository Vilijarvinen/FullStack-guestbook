$(function(){
    $.getJSON("guestbook.json", function(data){
        console.log(data);
        var uo = data;
        var or = uo.sort(function (a, b){
            return new Date(a.date) - new Date(b.date);
        });
        or.forEach(obj => {
            $("#glstuff").append("<li></li>");
            Object.entries(obj).forEach(([key, value]) => {
                var theli = $("#glstuff > li").last();
                if (key === "id"){
                    theli.append("ID: " + value + "&nbsp;");
                }
                if (key === "username"){
                    theli.append("USERNAME: " + value + "<br>");
                }
                if (key === "country"){
                    theli.append("FROM: " + value + "<br>");
                }
                if (key === "message"){
                    theli.append(value);
                }
            })
        });
    });
    $.getJSON("ajmsg.json", function(data){
        console.log(data);
        var uo = data;
        var or = uo.sort(function (a, b){
            return new Date(a.date) - new Date(b.date);
        });
        or.forEach(obj => {
            $("#ajstuff").append("<li></li>");
            Object.entries(obj).forEach(([key, value]) => {
                var theli = $("#ajstuff > li").last();
                if (key === "id"){
                    theli.append("ID: " + value + "&nbsp;");
                }
                if (key === "username"){
                    theli.append("USERNAME: " + value + "<br>");
                }
                if (key === "country"){
                    theli.append("FROM: " + value + "<br>");
                }
                if (key === "message"){
                    theli.append(value);
                }
            })
        });
    });
});
$('#glquery').keyup(function () {
    function hakufunktio(syötettyteksti) {
        $('li').each(function () {
            var löytyi = 'false';
            $(this).each(function () {
                if ($(this).text().toLowerCase().indexOf(syötettyteksti.toLowerCase()) >= 0) {
                    löytyi = 'true';
                }
            });
            if (löytyi == 'true') {
                let $tämä = $(this);
                $tämä.closest('li').show();
            }
            else {
                let $tämä = $(this);
                $tämä.closest('li').hide();
            }
        });
    }
    hakufunktio($(this).val());
});
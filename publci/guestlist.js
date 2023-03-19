$(function(){
    $.getJSON("guestbook.json", function(data){
        console.log(data);

        data.forEach(obj => {
            $("#glist").append("<li><br></li>")
            Object.entries(obj).forEach(([key, value]) => {
                console.log(`${key} ${value}`);
                if (key === "username" ||
                key === "country" ||
                key === "message"){
                    $("#glist").append("<li><div id=\"key\">" + key + ":</div> <div id=\"value\">" + value + "</div></li>")
                };
            });
        });
    });
});
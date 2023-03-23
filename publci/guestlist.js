$(function(){
    $.getJSON("guestbook.json", function(data){
        console.log(data);
        var uo = data;
        var or = uo.sort(function (a, b){
            return new Date(a.date) - new Date(b.date);
        });
        or.forEach(obj => {
            console.log(obj);
            $("#gulist").append("<tr></tr>")
            Object.entries(obj).forEach(([key, value]) => {
                console.log(`${key} ${value}`);
                var table = document.getElementById("gulist");
                var lastrow = table.rows[table.rows.length - 1];
                if (key === "username"){
                    let td = document.createElement("td");
                    td.innerHTML = value;
                    lastrow.append(td);
                }
                if (key === "country"){
                    let td = document.createElement("td");
                    td.innerHTML = value;
                    lastrow.append(td);
                }
                if (key === "message"){
                    let td = document.createElement("td");
                    td.innerHTML = value;
                    lastrow.append(td);
                }
            });
        });
    });
});
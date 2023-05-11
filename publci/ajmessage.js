var subbut = document.getElementById("subbut");

subbut.addEventListener("click", function(){
    $.getJSON("ajmsg.json", function(data){

        var runidarr = [];
        var runid = 0;

        data.forEach(obj => {
            Object.entries(obj).forEach(([key, value]) => {
                if (key === "id") {
                    runidarr.push(value);
                }
            });
        });

        runid = Math.max(...runidarr);
        console.log(runid);

        var uo = data;
        var mydata = uo.sort(function (a, b){
            return new Date(a.date) - new Date(b.date);
        });

        var uname = document.getElementById("uname").value;
        var country = document.getElementById("country").value;
        var message = document.getElementById("message").value;

        if (uname){
            if(country){
                if(message){
                    runid++;
                    runidtxt = runid.toString();

                    var day = new Date();
                    day = day.toString();

                    newdata = {"id": runidtxt, "username": uname, "country": country, "date": day, "message": message};

                    console.log(newdata);
                    mydata.push(newdata);
                    console.log(mydata);

                    fetch("/ajaxmessage", {
                        method: "POST",
                        headers: {"Content-Type": "application/json",},
                        body: JSON.stringify(mydata),
                    });
                    document.getElementById("uname").value = "";
                    document.getElementById("country").value = "";
                    document.getElementById("message").value = "";

                    function lapsetVittuun(parent) {
                        while (parent.firstChild) {
                            parent.removeChild(parent.firstChild);
                        }
                    }
                    let lista = document.getElementById('ajlist');
                    lapsetVittuun(lista);

                    $("#ajlist").append("<h2>All of the Ajax messages sent:</h2>");
                    $.getJSON("ajmsg.json", function(data){
                        data.forEach(obj => {
                            console.log(obj);
                            Object.entries(obj).forEach(([key, value]) => {
                                console.log(`${key} ${value}`);
                                if (key === "message"){
                                    $("#ajlist").append("<li><p>" + value + "</p></li>")
                                }
                            });
                        });
                    });
                }
                else {
                    alert("Fill in all of the input fields!")
                }
            }
            else {
                alert("Fill in all of the input fields!")
            }
        }
        else {
            alert("Fill in all of the input fields!")
        }
    });
});
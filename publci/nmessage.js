var subbut = document.getElementById("subbut");

subbut.addEventListener("click", function(){
    $.getJSON("guestbook.json", function(data){

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

        var mydata = data;

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

                    fetch("/newmessage", {
                        method: "POST",
                        headers: {"Content-Type": "application/json",},
                        body: JSON.stringify(mydata),
                    });
                    document.getElementById("uname").value = "";
                    document.getElementById("country").value = "";
                    document.getElementById("message").value = "";
                    alert("Message was sent!");
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
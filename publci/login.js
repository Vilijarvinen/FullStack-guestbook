var subbut = document.getElementById("subbut");

document.getElementById("passw").addEventListener("keypress", function (enter){
    if (enter.key === 'Enter'){
        var uname = document.getElementById("uname").value;
        var passw = document.getElementById("passw").value;
        var stuff = {"username": uname, "password": passw};
    
        fetch("/admin", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(stuff),
        }).then(function(response){
            if(response.status === 401){
                alert("Wrong username or password!");
            }
            else {
                var form = document.getElementById("formi")
                form.setAttribute("class", "hidden")
                var toadmin = document.createElement("button");
                toadmin.setAttribute("onclick", "location.href='/adminpage'")
                toadmin.setAttribute("class", "subbut")
                toadmin.setAttribute("id", "adminpage")
                $("#gbcont").append(toadmin);
                $("#adminpage").html("To Admin Page")
                alert("login successful");
            }
        });
    }
});

subbut.addEventListener("click", function(){
    var uname = document.getElementById("uname").value;
    var passw = document.getElementById("passw").value;
    var stuff = {"username": uname, "password": passw};

    fetch("/admin", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(stuff),
    }).then(function(response){
        if(response.status === 401){
            alert("Wrong username or password!");
        }
        else {
            var form = document.getElementById("formi")
            form.setAttribute("class", "hidden")
            var toadmin = document.createElement("button");
            toadmin.setAttribute("onclick", "location.href='/adminpage'")
            toadmin.setAttribute("class", "subbut")
            toadmin.setAttribute("id", "adminpage")
            $("#gbcont").append(toadmin);
            $("#adminpage").html("To Admin Page")
            alert("login successful");
        }
    });
});

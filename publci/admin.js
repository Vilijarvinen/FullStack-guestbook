var serbut = document.getElementById("searchb");

serbut.addEventListener("click", function () {
    var quetxt = document.getElementById("glquery").value;
    console.log(quetxt);
    var fasd = { "asd": "asd" };
    if(!quetxt){
        fetch("/adminpage/ids", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(fasd)
        }).then((res) => res.json()).then((data) => {
            $("#gbcont").append("<br>Try one of these ID's:<br>")
            data.forEach(obj => {
                Object.entries(obj).forEach(([key, value]) => {
                    if (key === "id") {
                        $("#gbcont").append(value + " ")
                    }
                });
            })
        })
        fetch("/adminpage/ids2", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(fasd)
        }).then((res) => res.json()).then((data) => {
            $("#gbcont").append("<br>Try one of these Ajmsg ID's:<br>")
            data.forEach(obj => {
                Object.entries(obj).forEach(([key, value]) => {
                    if (key === "id") {
                        $("#gbcont").append(value + " ")
                    }
                });
            })
        })
    } else {
    var asd = { "id": quetxt };
    fetch("/adminpage/search", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(asd)
    })
        .then((res) => res.json())
        .then((data) => {
            var pdata = JSON.stringify(data);
            function lapsetVittuun(parent) {
                while (parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
            }
            let lista = document.getElementById('gulist');
            lapsetVittuun(lista);
            console.log(pdata)
            if (pdata === "{\"null\":null}") {
                $("#gulist").append("<tr><th>No message found with given id</th></tr>")
            } else {
                $("#gulist").append("<tr><th>Messages</th></tr><tr><th id=\"iid\">ID</th><th id=\"usna\">Username</th><th id=\"ctry\">Country</th><th id=\"mesag\">Message</th><th></th></tr><tr></tr>")
                var table = document.getElementById("gulist");
                var lastrow = table.rows[table.rows.length - 1];
                Object.entries(data).forEach(([key, value]) => {
                    if (key === "id") {
                        let td = document.createElement("td");
                        td.innerHTML = value;
                        lastrow.append(td);
                    }
                    if (key === "username") {
                        let td = document.createElement("td");
                        td.innerHTML = value;
                        lastrow.append(td);
                    }
                    if (key === "country") {
                        let td = document.createElement("td");
                        td.innerHTML = value;
                        lastrow.append(td);
                    }
                    if (key === "message") {
                        let td = document.createElement("td");
                        td.innerHTML = value;
                        lastrow.append(td);
                    }
                });
                let td = document.createElement("td");
                td.innerHTML = "<input type=\"button\" id=\"del1\" class=\"subbut\" value=\"DELETE\">";
                lastrow.append(td);
                var delb = document.getElementById("del1");
                delb.addEventListener("click", function () {
                    fetch("/adminpage/delete", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", },
                        body: JSON.stringify(asd)
                    })
                    this.parentElement.parentElement.remove();
                })
            }
        })
    fetch("/adminpage/search2", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(asd)
    })
        .then((res) => res.json())
        .then((data) => {
            var pdata = JSON.stringify(data);
            function lapsetVittuun(parent) {
                while (parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
            }
            console.log(pdata)
            let lista = document.getElementById('gulist2');
            lapsetVittuun(lista);
            if (pdata === "{\"null\":null}") {
                $("#gulist2").append("<tr><th>No ajax message found with given id</th></tr>")
            } else {
                $("#gulist2").append("<tr><th>Ajax messages</th></tr><tr><th id=\"iid\">ID</th><th id=\"usna\">Username</th><th id=\"ctry\">Country</th><th id=\"mesag\">Message</th><th></th></tr><tr></tr>")
                var table = document.getElementById("gulist2");
                var lastrow = table.rows[table.rows.length - 1];
                Object.entries(data).forEach(([key, value]) => {
                    if (key === "id") {
                        let td = document.createElement("td");
                        td.innerHTML = value;
                        lastrow.append(td);
                    }
                    if (key === "username") {
                        let td = document.createElement("td");
                        td.innerHTML = value;
                        lastrow.append(td);
                    }
                    if (key === "country") {
                        let td = document.createElement("td");
                        td.innerHTML = value;
                        lastrow.append(td);
                    }
                    if (key === "message") {
                        let td = document.createElement("td");
                        td.innerHTML = value;
                        lastrow.append(td);
                    }
                });
                let td = document.createElement("td");
                td.innerHTML = "<input type=\"button\" id=\"del2\" class=\"subbut\" value=\"DELETE\">";
                lastrow.append(td);
                var delb2 = document.getElementById("del2");
                delb2.addEventListener("click", function () {
                    fetch("/adminpage/delete2", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", },
                        body: JSON.stringify(asd)
                    })
                    this.parentElement.parentElement.remove();
                })
            }
        })
    }
});
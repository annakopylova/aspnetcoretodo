let uri = "/api/do/";
let todo = null;

document.addEventListener("DOMContentLoaded", function (event) {
    getDo();
});

function getCount(data) {
    const el = document.querySelector("#counter");
    let name = "Количество задач: ";
    if (data > 0) {
        el.innerText = name + data;
    } else {
        el.innerText = "Задач еще нет";
    }
}

function getDo() {
    console.log('getDo');
    let request = new XMLHttpRequest();
    request.open("GET", uri);
    request.onload = function () {
        todo = JSON.parse(request.responseText);
        createDoHTML();
    };
    request.send();
}

function createDoHTML() {
    let html = "";
    let elDo = document.querySelector("#do");
    for (i in todo) {
        html += '<div class="doText"><span>' + todo[i].doId + ' : ' + todo[i].url + ' </span>';
        html +=  "<button onclick='editDo(" + todo[i].doId + ")'>Изменить</button>";
        html +=  "<button onclick='deleteDo(" + todo[i].doId+")'>Удалить</button>";
    }
    console.log(html);
    elDo.innerHTML = html;
}

function createDo() {
    let urlText = "";
    urlText = document.querySelector("#createDiv").value;
    var request = new XMLHttpRequest();
    request.open("POST", uri);
    request.onload = function () {
        getDo();
        document.querySelector("#createDiv").value = "";
    };
    request.setRequestHeader("Accepts", "application/json;charset=UTF-8");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({ url: urlText }));
}

function editDo(id) {
    let elm = document.querySelector("#editDiv");
    elm.style.display = "block";
    if (todo) {
        let i;
        for (i in todo) {
            if (id === todo[i].doId) {
                document.querySelector("#edit-id").value = todo[i].doId;
                document.querySelector("#edit-url").value = todo[i].url;
            }
        }
    }
}

function udateDo() {
    const todo = {
        todoid: document.querySelector("#edit-id").value,
        url: document.querySelector("#edit-url").value
    };
    var request = new XMLHttpRequest();
    request.open("PUT", uri + todo.todoid);
    request.onload = function () {
        getDo();
        closeInput();
    };
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(todo));
}

function deleteDo (id){
    let request = new XMLHttpRequest();
    request.open("DELETE", uri + id, false);
    request.onload = function () {
        getDo();
    };
    request.send();
}

function closeInput() {
    let elm = document.querySelector("#editDiv");
    elm.style.display = "none";
}


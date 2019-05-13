﻿/*jshint esversion: 6 */
const uri = "/api/do/";
let items = null;

document.addEventListener("DOMContentLoaded", function (event) {
    getDo();
    // Обработка кликов по кнопкам
    document.getElementById("loginBtn").addEventListener("click", logIn);
    document.getElementById("logoffBtn").addEventListener("click", logOff);
    getCurrentUser();
});

function getCount(data) {
    const el = document.querySelector("#counter");
    let name = "Number of tasks: ";
    if (data > 0) {
        el.innerText = name + data;
    } else {
        el.innerText = "Дел еще нет";
    }
}

function getDo() {
    console.log('getdo')
    let request = new XMLHttpRequest();
    request.open("GET", uri);
    request.onload = function () {
        let todo = "";
        let todoHTML = ""; 
        console.log(request.responseText);
        todo = JSON.parse(request.responseText);

        console.log(todo);

        if (typeof todo !== "undefined") {
            getCount(todo.length);
            if (todo.length > 0) {
                if (todo) {
                    var i;
                    for (i in todo) {
                        console.log(todo[i]);
                        let checkedFlag;
                        if (todo[i].status === true) {
                            checkedFlag = 'checked';
                        } else {
                            checkedFlag = '';
                        }
                        todoHTML += '<div style="margin-top: 10px" class="container-fluid" ></div><span><ul class="list-group"><li class="list-group-item"> <input type="checkbox" onclick="handleChange(' + !(todo[i].status === true) + ',' + todo[i].doId + ',\'' + todo[i].url + '\')" ' + checkedFlag + ' style="margin-right: 20px; height: 20px; width: 20px;">' + todo[i].url + ' </li></ul></span>';
                        //todoHTML += '<button style="margin-left: 235px" type="button" class="btn btn-primary btn-sm" onclick="deleteDo(' + todo[i].doId + ')"> <span class="glyphicon glyphicon-remove" ></span >Done</button >';
                        todoHTML += '<button style="margin-left: auto" type="button"  class="btn btn-success btn-sm" onclick="editDo(' + todo[i].doId + ')"><span class="glyphicon glyphicon-pencil" aria-hidden="true">Edit</span></button>';
                        todoHTML += '<button style="margin-left: 1px" type="button" class="btn btn-danger btn-sm" onclick="deleteDo(' + todo[i].doId + ')"> <span class="glyphicon glyphicon-remove" ></span > Remove </button ></div></div></div>';
                        if (typeof todo[i].task !== "undefined" && todo[i].task.length > 0) {
                            let j;
                            for (j in todo[i].task) {
                                todoHTML += "<p>" + todo[i].task[j].content + "</p>";
                            }
                        }
                    }
                }
            }
            items = todo;
            console.log(items);
            document.getElementById("#doDiv").innerHTML = todoHTML;
        }
    };
    request.send();
}

function handleChange(checkbox, todoid, url) {
    console.log(checkbox);
    console.log(todoid);
    console.log(url);
    var request = new XMLHttpRequest();
    request.open("PUT", uri + todoid);
    request.onload = function () {
        getDo();
    };
    request.setRequestHeader("Accepts", "application/json;charset=UTF-8");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({ todoid: todoid, url: url, status: checkbox }));
}

function createDo() {
    let urlText = "";
    urlText = document.querySelector("#createDiv").value;
    var request = new XMLHttpRequest();
    request.open("POST", uri);
    request.onload = function () {

        // Обработка кода ответа
        var msg = "";
        if (request.status === 401) {
            msg = "У вас не хватает прав для создания";
        } else if (request.status === 201) {
            msg = "Задание добавлено";
            getBlogs();
        } else {
            msg = "Неизвестная ошибка";
        }
        document.querySelector("#actionMsg").innerHTML = msg;
    };
    request.setRequestHeader("Accepts", "application/json;charset=UTF-8");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({ url: urlText }));
}

function editDo(id) {
    let elm = document.querySelector("#editDiv");
    elm.style.display = "block";
    if (items) {
        let i;
        for (i in items) {
            if (id === items[i].doId) {
                document.querySelector("#edit-id").value = items[i].doId;
                document.querySelector("#edit-url").value = items[i].url;
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

function deleteDo(id) {
    console.log('deletedo');
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






function logIn() {
    var email, password = "";
    // Считывание данных с формы
    email = document.getElementById("Email").value;
    password = document.getElementById("Password").value;
    var request = new XMLHttpRequest();
    request.open("POST", "/api/Account/Login");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function () {
        // Очистка контейнера вывода сообщений
        document.getElementById("msg").innerHTML = "";
        var mydiv = document.getElementById('formError');
        while (mydiv.firstChild) {
            mydiv.removeChild(mydiv.firstChild);
        }
        // Обработка ответа от сервера
        if (request.responseText !== "") {
            var msg = null;
            msg = JSON.parse(request.responseText);
            document.getElementById("msg").innerHTML = msg.message;
            // Вывод сообщений об ошибках
            if (typeof msg.error !== "undefined" && msg.error.length > 0) {
                for (var i = 0; i < msg.error.length; i++) {
                    var ul = document.getElementsByTagName("ul");
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(msg.error[i]));
                    ul[0].appendChild(li);
                }
            }
            document.getElementById("Password").value = "";
        }
    };
    // Запрос на сервер
    request.send(JSON.stringify({
        email: email,
        password: password
    }));
}

function logOff() {
    var request = new XMLHttpRequest();
    request.open("POST", "api/account/logoff");
    request.onload = function () {
        var msg = JSON.parse(this.responseText);
        document.getElementById("msg").innerHTML = "";
        var mydiv = document.getElementById('formError');
        while (mydiv.firstChild) {
            mydiv.removeChild(mydiv.firstChild);
        }
        document.getElementById("msg").innerHTML = msg.message;
    };
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send();
}
function getCurrentUser() {
    let request = new XMLHttpRequest();
    request.open("POST", "/api/Account/isAuthenticated", true);
    request.onload = function () {
        let myObj = "";
        myObj = request.responseText !== "" ? JSON.parse(request.responseText) : {};
        document.getElementById("msg").innerHTML = myObj.message;
    };
    request.send();
}

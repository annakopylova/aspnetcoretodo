const uri = "/api/account/Login";
// запрос на логин
function Login() {
    console.log('registering');
    // Считывание данных с формы
    var email = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;

    let request = new XMLHttpRequest();
    request.open("POST", uri);
    request.setRequestHeader("Accepts", "application/json;charset=UTF-8");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log('sent');
    // Обработка ответа
    request.onload = function () {
        ParseResponse(this, email);
    };
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
        }
    };
    
    // Запрос на сервер
    request.send(JSON.stringify({
        Email: email,
        Password: password,
    }));
}

function saveName(name) {
    localStorage.setItem('name', name);
}

// Разбор ответа
function ParseResponse(e, email) {
    // Очистка контейнера вывода сообщений
    // Обработка ответа от сервера
    let response = JSON.parse(e.responseText);
    var msg = e['responseText'];
    let json = JSON.parse(msg);

    let error = json['error'];

    if (error === undefined) {
        localStorage.setItem('entered', 'True');
        window.location.href = "../index.html"
        saveName(email);
    } else {
        document.querySelector("#actionMsg").innerHTML = json['error'];
    }
}

document.addEventListener("DOMContentLoaded", function () {
// Обработка клика по кнопке регистрации
    document.querySelector("#registerBtn").addEventListener("click", Login);
});
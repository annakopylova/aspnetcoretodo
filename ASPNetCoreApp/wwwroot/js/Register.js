const uri = "/api/account/Register";

// запрос на регистрацию
function Login() {
    console.log('registering');
    // Считывание данных с формы
    var email = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    var passwordonemore = document.querySelector("#passwordonemore").value;

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
    
    request.send(JSON.stringify({
        Email: email,
        Password: password,
        PasswordConfirm: passwordonemore
    }));
}

// Разбор ответа
function ParseResponse(e, email) {
    console.log('ParseResponse');
    // Очистка контейнера вывода сообщений
    // Обработка ответа от сервера
    let response = JSON.parse(e.responseText);
    console.log(response);

    var msg = e['responseText'];
    let json = JSON.parse(msg);
    console.log(json);

    let error = json['error'];

    if (error === undefined) {
        localStorage.setItem('entered', 'True');
        saveName(email);
        window.location.href = "../index.html"
    } else {
        document.querySelector("#actionMsg").innerHTML = json['error'];
    }
}

function saveName(name) {
    // сохраняем имя
    localStorage.setItem('name', name);
}

document.addEventListener("DOMContentLoaded", function () {
    // Обработка клика по кнопке регистрации
    document.querySelector("#registerBtn").addEventListener("click", Login);
});



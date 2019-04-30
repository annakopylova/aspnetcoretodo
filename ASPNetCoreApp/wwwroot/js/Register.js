const uri = "/api/account/Register";
function Register() {
    console.log('registering');
    // Считывание данных с формы
    var email = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;

    let request = new XMLHttpRequest();
    request.open("POST", uri);
    request.setRequestHeader("Accepts", "application/json;charset=UTF-8");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Обработка ответа
    request.onload = function () {
        ParseResponse(this);
    };
    // Запрос на сервер
    request.send(JSON.stringify({
        email: email,
        password: password
    }));
    console.log('request sent');
}

// Разбор ответа
function ParseResponse(e) {
    console.log('ParseResponse');
    // Очистка контейнера вывода сообщений
    document.querySelector("#msg").innerHTML = "";
    var formError = document.querySelector("#formError");
    while (formError.firstChild) {
        formError.removeChild(formError.firstChild);
    }
    // Обработка ответа от сервера
    let response = JSON.parse(e.responseText);
    console.log(response);
    document.querySelector("#msg").innerHTML = response.message;
    // Вывод сообщений об ошибках
    if (response.error.length > 0) {
        for (var i = 0; i < response.error.length; i++) {
            let ul = document.querySelector("ul");
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(response.error[i]));
            ul.appendChild(li);
        }
    }
    // Очистка полей паролей
    document.querySelector("#password").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    document.querySelector("#registerBtn").addEventListener("click", Register);
});

// Обработка клика по кнопке регистрации

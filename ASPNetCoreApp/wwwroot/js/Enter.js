const uri = "/api/account/Login";
function Register() {
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
        ParseResponse(this);
    };
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
        }
    };

    console.log(JSON.stringify({
        Email: email,
        Password: password,
    }));
    // Запрос на сервер
    request.send(JSON.stringify({
        Email: email,
        Password: password,
    }));
    console.log(request);
}   

// Разбор ответа
function ParseResponse(e) {
    console.log('ParseResponse');
    // Очистка контейнера вывода сообщений
    // Обработка ответа от сервера
    let response = JSON.parse(e.responseText);
    console.log(response);
}

document.addEventListener("DOMContentLoaded", function () {
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    document.querySelector("#registerBtn").addEventListener("click", Register);
});

// Обработка клика по кнопке регистрации

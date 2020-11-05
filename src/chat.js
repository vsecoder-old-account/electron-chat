const request = require('request');
function popup () {
  nameup.style.display = "block";
  msginput.disabled = true;
}
function userbtn () {
  if (tname.value.length >= 3 && tname.value.length <= 15) {
    nameup.style.display = "none";
    localStorage.setItem('name', tname.value);
    msginput.disabled = false;
  } else {
    alert('Поле заполнено неверно, или не заполнено!');
  }
}
// старт, и проверка сервера
function reqstart () {
  request('https://chatapi2.herokuapp.com/1', function (error, response, body) {
    //console.clear();
    console.log('statusCode:', response && response.statusCode);
    // тест системы
    //error = 5;
    //response.statusCode = 404;
    if (response.statusCode == 200 && error == null) {
      reqread();
    } else {
      alert('О чёрт... Что-то пошло не так!');
    }
  });
  let test = localStorage.getItem('name');
  if (test == null) {
    popup();
  } else {
    console.log('👍');
  }
  box.scrollTop = 1000000;
}
// чтение
function reqread () {
  request('https://chatapi2.herokuapp.com/1/read', function (error, response, body) {
    //console.clear();
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    //if (txtn) {
    //  txtn.remove();
    //}
    while (box.firstChild) {
      box.removeChild(box.lastChild);
    }
    // обработка сообщения
    body = body.replace(/\n/g, '</div><div id="txtn" class="bubble">');
    body = body.replace(/;/g, ' : ');
    chatup(body);
  });
  setTimeout(reqread, 500);
}
// отправка
function requp () {
  let user = encodeURIComponent(localStorage.getItem('name'));
  let msg = encodeURIComponent(msginput.value);
  msg = msg.replace(/ /g, '%20');
  if (msg != "") {
    request('https://chatapi2.herokuapp.com/1/write/' + user + '/' + msg, function (error, response, body) {
      //console.clear();
      console.log('error:', error);
    });
  } else {
    console.log('Пусто =)');
  }
  msginput.value = "";
  box.scrollTop = 1000000;
}
// добавление сообщений
function chatup (msg) {
  var upmsg = '<div id="txtn" class="bubble">' + msg + "</div>";
  box.insertAdjacentHTML("beforeend", upmsg);
}
//start
reqstart();

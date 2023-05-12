class UserService {
    //Переименованные переменные имени пользователя и пароля в _username и _password соответственно, чтобы избежать конфликтов с методами получения.
    constructor(username, password) {
      this._username = username;
      this._password = password;
    }
  
    // Renamed the getter methods to getUsername and getPassword for clarity
    // Also, changed the return value to return this._username and throw an error if someone tries to access the password
    getUsername() {
      return this._username;
    }
  
    getPassword() {
      throw 'You are not allowed to get password';
    }
  
    // Made the authenticate_user method asynchronous using promises
    static authenticate_user(username, password) {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(
          'GET',
          'https://examples.com/api/user/authenticate?username=' +
            username +
            '&password=' +
            password,
          true
        );
        xhr.responseType = 'json';
  
        xhr.onload = function () {
          if (xhr.status == 200) {
            resolve(true);
          } else {
            reject(xhr.response);
          }
        };
  
        xhr.onerror = function () {
          reject('An error occurred during the transaction');
        };
  
        xhr.send();
      });
    }
  }
  
  $('form #login').click(function () {
    var username = $('#username').val(); // Added .val() to get the value of the input fields
    var password = $('#password').val(); // Added .val() to get the value of the input fields
  
    UserService.authenticate_user(username, password)
      .then(() => {
        document.location.href = '/home';
      })
      .catch((err) => {
        alert(err.error);
      });
  });
  
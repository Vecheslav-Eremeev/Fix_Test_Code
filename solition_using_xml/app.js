// Define a user service class
class UserService {
  // Constructor to set the username and password
  constructor(username, password) {
    this._username = username;
    this._password = password;
  }

  // Get the username value
  getUsername() {
    return this._username;
  }

  // Get the password value, but throw an error if called
  getPassword() {
    throw new Error('You are not allowed to get the password');
  }

  // Authenticate a user using the supplied username and password
  static authenticate_user(username, password) {
    // Make an HTTP request to authenticate the user using the supplied username and password
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
        
      // Send a GET request with the supplied username and password
      xhr.open(
        'GET',
        'https://examples.com/api/user/authenticate?username=' +
        username +
        '&password=' +
        password,
        true
      );
      xhr.responseType = 'json';

      // Handle the response from the server
      xhr.onload = function () {
        if (xhr.status == 200) {
          resolve(true);
        } else {
          reject(xhr.response);
        }
      };

      // Handle errors that occur during the transaction
      xhr.onerror = function () {
        reject('An error occurred during the transaction');
      };

      // Send the request to the server
      xhr.send();
    });
  }
}

// Wait for the document to be ready
$(document).ready(function () {
  // Attach a click handler to the login button
  $('form #login').click(function () {
    // Get the username and password values from the input fields
    var username = $('#username').val(); 
    var password = $('#password').val();

    // Call the authenticate_user method on the UserService class to authenticate the user
    UserService.authenticate_user(username, password)
      .then(() => {
        // If authentication is successful, redirect the user to the home page
        document.location.href = '/home';
      })
      .catch((err) => {
        // If authentication fails, display an error message
        alert(err.error);
      });
  });
});

// Define a user service class
class UserService {
    // Constructor to set the username and password
    constructor(username, password) {
      this._username = username;
      this._password = password;
    }
  
    // Get the username value
    get username() {
      return this._username;
    }
  
    // Get the password value, but throw an error if called
    get password() {
      throw new Error('You are not allowed to get the password');
    }
  
    // Authenticate a user using the supplied username and password
    static authenticateUser(username, password) {
      // Make an HTTP request to authenticate the user
      return fetch(`https://examples.com/api/user/authenticate?username=${username}&password=${password}`)
        .then(response => {
          if (!response.ok) {
            // If the response was not OK, throw an error
            throw new Error('Failed to authenticate user');
          }
          return response.json();
        });
    }
  }
  
  // Wait for the document to be ready
  $(document).ready(function () {
    // Attach a click handler to the login button
    $('form #login').click(function () {
      // Get the username and password values from the input fields
      const username = $('#username').val();
      const password = $('#password').val();
  
      // Call the authenticateUser method on the UserService class to authenticate the user
      const res = UserService.authenticateUser(username, password);
  
      // Handle the response
      res.then(data => {
        document.location.href = '/home';
      }).catch(error => {
        alert(error.message);
      });
    });
  });
  

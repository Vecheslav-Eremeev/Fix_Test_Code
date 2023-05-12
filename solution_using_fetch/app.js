class UserService {
    constructor(username, password) {
        this._username = username;
        this._password = password;
    }

    get username() {
        return this._username;
    }

    get password() {
        throw new Error('You are not allowed to get the password');
    }

    static authenticateUser(username, password) {
        return fetch(`https://examples.com/api/user/authenticate?username=${username}&password=${password}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to authenticate user');
              }
              return response.json();
        });
    }
}

$('form #login').click(function() {
    const username = $('#username').val();
    const password = $('#password').val();

    const res = UserService.authenticateUser(username, password);

    res.then(data => {
        document.location.href = '/home';
    }).catch(error => {
        alert(error.message);
    });
});

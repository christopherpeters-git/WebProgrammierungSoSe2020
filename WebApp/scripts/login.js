class user {
    constructor(username, password, loginAccepted) {
        this.username = username;
        this.password = password;
        this.loginAccepted = loginAccepted;
    }
    get getname(){
        return this.username;
    }
    set loginStatus(staus){
        return this.loginAccepted=staus;
    }

}
//Funktion um das Login Fenster zu schließen.
function closeLoginWindow() {
    document.getElementById('login').style.display='none';
    document.getElementById('login-notification').style.display='none';
    console.log("Login Fenster wird geschlossen")
}
//Fügt bei den Inputs beim Login ein Eventheandler der auf die Taste "Enter" reagiert.
function eventOnEnterByLogin() {
    let inputUsername = document.getElementById('username');
    let inputPassword = document.getElementById('password');

    inputPassword.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            console.log("Event trigger, Enter Taste wurde gedrückt")
            loginCheck();
        }
    });
    inputUsername.addEventListener("keyup", function (event) {

        if (event.key === "Enter") {
            console.log("Event trigger, Enter Taste wurde gedrückt")
            loginCheck();
        }
    });
}

//Funktion überprüft die Benutzerdaten und meldet den User an.
function loginCheck() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //Prüfung ob Illegale zeichen verwendet wurden.
    if (!isInputLegal(username) || !isInputLegal(password)){
        document.getElementById('login-notification').innerHTML = 'Username oder Passwort falsch!';
        document.getElementById('login-notification').style.display='block';
        return;
    }

    const userlogin = new user(username, password,false);
    const request = createAjaxRequest();
    request.onreadystatechange = function() {
        if ((4 === this.readyState) && (200 === this.status)){
            const logins = JSON.parse(this.responseText);
            let iterator = new user("", "");
            for (iterator of logins){
                if (userComparison(userlogin,iterator)){
                    console.log("Zugangsdaten stimmen überein, Anmeldung wird durchgeführt")
                    document.getElementById('login-notification').style.display='none';
                    document.getElementById('login').style.display='none';
                    document.getElementById('login-name').innerHTML= userlogin.getname[0].toUpperCase();
                    document.getElementById('login-name').style.display = 'inline-block';
                    document.getElementById('loginLogout').innerHTML="Logout";
                    document.getElementById('loginLogout').setAttribute('onclick', 'logout()');
                    openAlert("Login erfolgreich");
                    userlogin.loginStatus = true;
                    //Speichert die Benutzerdaten im local Storage.
                    localStorage.setItem('auth',userlogin.username);

                    //Displays the submit comment div
                    document.getElementById("submitCommentDiv").style.display = "block";
                    return;
                }
            }
            console.log("Zugansdaten sind nicht Korrekt.")
            document.getElementById('login-notification').innerHTML = 'Username oder Passwort falsch!';
            document.getElementById('login-notification').style.display='block';
        }

    }
    request.open("GET","logins.json",true);
    request.send();
}

//Meldet den Benutzer ab.
function logout() {
    let loginButton = document.getElementById('loginLogout');
    loginButton.setAttribute('onclick', 'document.getElementById(\'login\').style.display=\'block\'');
    loginButton.innerText='Login';
    document.getElementById('login-name').innerHTML= '';
    openAlert("Erfolgreich Ausgeloggt")
    //Entfernt Benutzerdaten aus dem local Storage.
    localStorage.removeItem('auth');
    document.getElementById('login-name').style.display = 'none';
    document.getElementById("submitCommentDiv").style.display = "none";
    console.log("Benutzer wurde erfolgreich ausgelogt.")
}

// Vergleicht zweier Benutzerdaten.
function userComparison (loginuser,vergleich) {
    return loginuser.username === vergleich.username && loginuser.password === vergleich.password;
}


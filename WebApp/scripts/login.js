"use strict";

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    get getName(){
        return this.username;
    }
}


//Funktion um das Login Fenster zu schließen.
function closeLoginWindow() {
    document.getElementById('login').style.display='none';
    document.getElementById('login-notification').style.display='none';
    console.log("close login Window")
}



//Fügt bei den Inputs beim Login ein Eventheandler der auf die Taste "Enter" reagiert.
function eventOnEnterByLogin() {
    let inputUsername = document.getElementById('username');
    let inputPassword = document.getElementById('password');

    inputPassword.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            console.log("Event trigger, Enter key")
            loginCheck();
        }
    });
    inputUsername.addEventListener("keyup", function (event) {

        if (event.key === "Enter") {
            console.log("Event trigger, Enter key")
            loginCheck();
        }
    });
}



//Prüft ob jemand bereits angemeldet ist und setzt entsprechend den Button auf Login oder Logout
function setLoginLogoutButton() {

    const user = localStorage.getItem('auth');
    const button = document.getElementById('loginLogout');
    const userText = document.getElementById('login-name');

    if (user != null){
        button.setAttribute('onclick', 'logout()');
        button.innerHTML= "Logout";
        userText.innerHTML= user[0].toUpperCase();
        userText.style.display = 'inline-block';
    } else {
        userText.style.display = 'none';
    }

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

    const userlogin = new User(username, password,false);
    const request = createAjaxRequest();
    request.onreadystatechange = function() {
        if ((4 === this.readyState) && (200 === this.status)){
            const logins = JSON.parse(this.responseText);
            let iterator = new User("", "");
            for (iterator of logins){
                if (userComparison(userlogin,iterator)){
                    console.log("login successful")
                    document.getElementById('login-notification').style.display='none';
                    document.getElementById('login').style.display='none';
                    document.getElementById('login-name').innerHTML= userlogin.getName[0].toUpperCase();
                    document.getElementById('login-name').style.display = 'inline-block';
                    document.getElementById('loginLogout').innerHTML="Logout";
                    document.getElementById('loginLogout').setAttribute('onclick', 'logout()');
                    openAlert("Login erfolgreich");
                    //Speichert die Benutzerdaten im local Storage.
                    localStorage.setItem('auth',userlogin.username);

                    //Displays the submit comment div
                    document.getElementById("submitCommentDiv").style.display = "block";
                    return;
                }
            }
            console.log("login credentials incorrect.")
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
    console.log("logout successful.")
}


// Vergleicht zweier Benutzerdaten.
function userComparison (loginuser,vergleich) {
    return loginuser.username === vergleich.username && loginuser.password === vergleich.password;
}


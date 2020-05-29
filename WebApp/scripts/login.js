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

function closeLoginWindow() {
    document.getElementById('login').style.display='none';
    document.getElementById('login-notification').style.display='none';
}

function eventOnEnterByLogin() {
    let inputUsername = document.getElementById('username');
    let inputPassword = document.getElementById('password');

    inputPassword.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            loginCheck();
        }
    });
    inputUsername.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            loginCheck();
        }
    });
}

//Funktion überprüft die Benutzerdaten und meldet den User an.
function loginCheck() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
}

// Vergleicht zweier Benutzerdaten.
function userComparison (loginuser,vergleich) {
    return loginuser.username === vergleich.username && loginuser.password === vergleich.password;
}

/*
Fährt das Hinweisfenster mit ensprechenden Inhalt aus.
inhalt = String der den Inhalt des Hinweises enthällt.
 */
function openAlert(inhale) {
    const alert = document.getElementById('alert');
    const text = document.getElementById('alert-text');
    text.innerHTML = inhale;
    alert.style.bottom = "95%";
    alert.style.height = "5%";
    setTimeout(closeAlert,3000);
}
//Fährt das Hinweisfenster wieder ein.
function closeAlert() {
    const alert = document.getElementById("alert");
    alert.style.bottom = "100%";
    alert.style.height = "0%";
}
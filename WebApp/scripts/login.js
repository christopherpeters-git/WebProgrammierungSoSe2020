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
//Funktion überprüft die Benutzerdaten und meldet den User an.
function loginCheck() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
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
                    document.getElementById('login-name').innerHTML= 'Angemeldet als: ' + userlogin.getname;
                    document.getElementById('loginLogout').innerHTML="Logout";
                    document.getElementById('loginLogout').setAttribute('onclick', 'logout()');
                    openAlert("login erfolgreich");
                    userlogin.loginStatus(true);
                    //Speichert die Benutzerdaten im local Storage.
                    localStorage.setItem('auth',JSON.stringify(userlogin));
                    return;
                }
            }
            document.getElementById('login-notification').style.display='block';
        }

    }
    request.open("GET","logins.json",true);
    request.send();
}

//Meldet den Benutzer ab.
function logout() {
    let lgoinbutton = document.getElementById('loginLogout');
    lgoinbutton.setAttribute('onclick', 'document.getElementById(\'login\').style.display=\'block\'');
    lgoinbutton.innerText='Login';
    document.getElementById('login-name').innerHTML= '';
    openAlert("Erfolgreich Ausgeloggt")
    //Entfernt Benutzerdaten aus dem local Storage.
    localStorage.removeItem('auth');
}

// Vergleicht zweier Benutzerdaten.
function userComparison (loginuser,vergleich) {
    if (loginuser.username === vergleich.username && loginuser.password === vergleich.password){
        return true;
    }
    return false;
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
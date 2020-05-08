class user {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.loginAccepted = false;
    }
    get getname(){
        return this.username;
    }
    get getpassword(){
        return this.password;
    }
    set loginStatus(staus){
        return this.loginAccepted=staus;
    }

}

function loginCheck() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userlogin = new user(username, password);
   //  let usertest = new user("test","passwort");
    const request = createAjaxRequest();
    request.onreadystatechange = function() {
        openAlert("Test vor der if");
        if ((4 === this.readyState) && (200 === this.status)){
            openAlert("Test in der if")
            const users = JSON.parse(this.responseText);
            let iterator = new user("","");
            for (iterator of users){
                openAlert("Test in der for");
                if (userComparison(userlogin,iterator)){
                    document.getElementById('login-notification').style.display='none';
                    document.getElementById('login').style.display='none';

                    document.getElementById('login-name').innerHTML= 'Angemeldet als: ' + userlogin.getname;
                    document.getElementById('loginLogout').innerHTML="Logout";
                    document.getElementById('loginLogout').setAttribute('onclick', 'logout()');
                    openAlert("login erfolgreich");
                    userlogin.loginStatus(true);
                    return;
                }
            }
            document.getElementById('login-notification').style.display='block';
        }
        request.open("GET","login.json",true);
        request.send();
    }
    /*
    if (userComparison(userlogin,usertest)) {
       document.getElementById('login-notification').style.display='none';
       document.getElementById('login').style.display='none';

       document.getElementById('login-name').innerHTML= 'Angemeldet als: ' + userlogin.getname;
       document.getElementById('loginLogout').innerHTML="Logout";
       document.getElementById('loginLogout').setAttribute('onclick', 'logout()');
       openAlert("login erfolgreich");
       userlogin.loginStatus(true);


    } else {
        document.getElementById('login-notification').style.display='block';

    } */
}


function logout() {
    let lgoinbutton = document.getElementById('loginLogout');
    lgoinbutton.setAttribute('onclick', 'document.getElementById(\'login\').style.display=\'block\'');
    lgoinbutton.innerText='Login';
    document.getElementById('login-name').innerHTML= '';
    openAlert("Erfolgreich Ausgeloggt")
}

function userComparison (loginuser,vergleich) {
    if (loginuser.getname === vergleich.getname && loginuser.getpassword === vergleich.getpassword){
        return true;
    }
    return false;
}

function openAlert(inhale) {
    const alert = document.getElementById('alert');
    const text = document.getElementById('alert-text');
    text.innerHTML = inhale;
    alert.style.bottom = "95%";
    alert.style.height = "5%";
    setTimeout(closeAlert,3000);

}
function closeAlert() {
    const alert = document.getElementById("alert");
    alert.style.bottom = "100%";
    alert.style.height = "0%";
}
/*
Fährt das Hinweisfenster mit ensprechenden Inhalt aus.
inhalt = String der den Inhalt des Hinweises enthällt.
 */
function openAlert(inhale) {
    console.log("Alert Fenster wird angezeigt. Meldung: "+inhale);
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
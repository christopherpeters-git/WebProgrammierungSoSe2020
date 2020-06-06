function hideSite() {

    document.getElementById("search_header").style.display = "none";
    document.getElementById("loginStuff").style.display = "none";
    document.getElementById("impressum").style.display = "block"
    document.getElementById("searchentrys").innerHTML = "";
    if(videoplayerOpen) {
        showOverviewHideVideoplayer();
    }
    document.getElementById("videooverview").style.display = "none";
    document.getElementById("slideShow").hidden = true;
    impressumCalled = true;

}

function showSite() {
    document.getElementById("impressum").style.display = "none"


    document.getElementById("search_header").style.display = "block";
    document.getElementById("loginStuff").style.display = "block";
    document.getElementById("slideShow").hidden = false;

    document.getElementById("videooverview").style.display = "block";
    impressumCalled = false;
}

function handleDecisionImpressum() {
    if(impressumCalled) {
        showSite();
    }else{
        showOverviewHideVideoplayer();
    }
}

//Erstellt Tabelle für die Quellen im Impressum.
function setQuellenTabelle() {

    const impressum = document.getElementById('impressum');
    const table = document.createElement('table');

    const header = document.createElement('thead');
    const headerZeile = document.createElement('tr');
    const headerVideoName = document.createElement('td');
    const headerQuelle = document.createElement('td');
    const body = document.createElement('tbody');

    header.style.display='table-header-group';

    headerVideoName.innerHTML = "Video";
    headerQuelle.innerHTML = "Quelle";

    table.setAttribute('class', 'quellTable');

    headerZeile.appendChild(headerVideoName);
    headerZeile.appendChild(headerQuelle);
    header.appendChild(headerZeile);
    table.appendChild(header);
    table.appendChild(body);

    impressum.appendChild(table);

    const request = createAjaxRequest();
    request.onreadystatechange = function () {

        if ((4 === this.readyState) && (200 === this.status)) {
            const videos = JSON.parse(this.responseText);
            let iterator = new Video('','','','','','','');
            for (iterator of videos) {
                const zeile = document.createElement('tr');
                const videoName = document.createElement('td');
                const quelle = document.createElement('td');

                videoName.innerHTML = iterator.name;
                quelle.innerHTML = iterator.source;

                zeile.appendChild(videoName);
                zeile.appendChild(quelle);

                body.appendChild(zeile);

            }
        }

    }
    request.open("GET","videos.json",true);
    request.send();
}
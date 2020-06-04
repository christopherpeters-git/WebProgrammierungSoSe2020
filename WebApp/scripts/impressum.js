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
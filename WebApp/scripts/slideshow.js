"use strict";

let slideIndex = 1;

// addiert zum
function plusSlides(n) {
    showSlides(slideIndex += n);
}

//wechselt das Bild abhängig vom aktuellen Index
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    console.log(slideIndex);
}

//Buttons werden sichtbar
function setButtonsVisible() {
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");
    next.hidden=false;
    prev.hidden=false;
}

//Buttons werden unsichtbar
function setButtonsHidden() {
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");
    next.hidden=true;
    prev.hidden=true;
}

//returned den aktuellen Index
function getIndex() {
    return slideIndex;
}

//versteckt die Slideshow
function hideSlideShow() {
    const slideShow= document.getElementById("slideShow");
    slideShow.hidden = slideShow.hidden === false;

}

//Zeigt das Video abhängig vom Bild
function showVideoHideSlideshow() {
    let video_id = getIndex();
    let video = new Video("","","","");
    const request = createAjaxRequest();
    request.onreadystatechange = function(){
        if((4 === this.readyState) && (200 === this.status)){
            const videos = JSON.parse(this.responseText);
            for(video of videos) {
                if (video_id === video.id){
                    showVideoPlayerHideOverview(JSON.stringify(video));
                }
            }
        }
    }

    request.open("GET","videos.json",true);
    request.send();
}

//Eventhandler für die Bilder
function setEventHandlerSlideShow() {
    let elements = document.getElementsByClassName("mySlides");
    console.log(elements);
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', showVideoHideSlideshow, false);
    }
}

"use strict";

var slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}


function setButtonsVisible() {
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");
    next.hidden=false;
    prev.hidden=false;
}
function setButtonsHidden() {
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");
    next.hidden=true;
    prev.hidden=true;
}

function getIndex() {
    return slideIndex;
}

function hideSlideShow() {
    const slideShow= document.getElementById("slideShow");
    if(slideShow.hidden===false){
        slideShow.hidden=true;
    }else {
        slideShow.hidden=false;
    }

}

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


function setEventHandlerSlideShow() {
    let elements = document.getElementsByClassName("mySlides");
    console.log(elements);
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', showVideoHideSlideshow, false);
    }
}

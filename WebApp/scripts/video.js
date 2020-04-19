"use strict";

const forbidden=['<','>'];

//*************************************Classes**************************************
//NOT USED YET
class Comment{
    constructor(author,message){
        const date = new Date();
        this.author = author;
        this.message = message;
        this.date = date.toDateString();
    }
}

class Video{
    constructor(id,src,name,duration){
        this.id = id;
        this.src = src;
        this.name = name;
        this.duration = duration;
    }
}

//*************************************Helpers**************************************

//creats XMLHttp- or ActiveX-Request depending on browser support
function createAjaxRequest(){
    let request;
    if(window.XMLHttpRequest){
        request = new XMLHttpRequest();
    }else{
        request = new ActiveXObject();
    }
    return request;
}

//Checks if string contains illegal characters which are defined in forbidden
function isInputLegal(strIn){
    const inputLength = strIn.length;
    const forbiddenLength = forbidden.length;
    for(let i = 0; i < inputLength;i++){
        for(let j = 0; j < forbiddenLength;j++){
            if(strIn[i] == forbidden[j]){
                return false;
            }
        }
    }
    return true;
}
//*************************************Initializers************************************

//Creates an entry on the video-overview for every video listed in the videos.json
function initVideoOverview(){
    var request = createAjaxRequest();
    request.onreadystatechange = function(){
        if(4 == this.readyState && 200 == this.status){
            const videos = JSON.parse(this.responseText);
            const videoOverview = document.getElementById("videooverview");
            let video = new Video("","","","");
            for(video of videos){
                const header5 = document.createElement("h5");
                const header7 = document.createElement("h7");
                const ahref = document.createElement("a");
                ahref.href = "javascript:showVideoPlayerHideOverview(" + "'" + JSON.stringify(video)+ "'" + ")";
                ahref.innerHTML = video.name;
                header5.appendChild(ahref);
                header7.innerHTML = video.duration;
                videoOverview.appendChild(header5);
                videoOverview.appendChild(header7);
            }
        }
    }
    request.open("GET","./videos.json",true);
    request.send();
}

//*************************************HTML-called-functions***********************************
//Is called on page load, calls all initializers
function init(){
    initVideoOverview()
}

//Shows the video-player and hides the video-list
function showVideoPlayerHideOverview(videoStr){
    var vidArea = document.getElementById("videoArea");
    if(vidArea.style.display == "none") {
        const video = JSON.parse(videoStr);
        const vidOverview = document.getElementById("videooverview");
        //var videoSrc = document.getElementById("videosource");
        const videoTitle = document.getElementById("videotitle");
        const buttonBackToVideos = document.getElementById("backtovideos");
        const videoPlayer = document.createElement("video");
        const videoSource = document.createElement("source");

        videoPlayer.setAttribute("controls","true");
        videoPlayer.setAttribute("width","800");
        videoPlayer.setAttribute("height","450");
        videoSource.setAttribute("type","video/mp4");
        videoSource.setAttribute("src",video.src);
        videoPlayer.appendChild(videoSource);
        vidArea.insertBefore(videoPlayer,vidArea.firstChild);

        vidOverview.style.display = "none";
        videoTitle.innerHTML = video.name;
        buttonBackToVideos.style.display = "block";
        vidArea.style.display = "block";
        hideSlideShow();
    }
}
//Shows the video-list and hides the video-player
function showOverviewHideVideoplayer(){
    const vidOverview = document.getElementById("videooverview");
    if(vidOverview.style.display == "none"){
        const vidArea = document.getElementById("videoArea");
        const buttonBackToVideos = document.getElementById("backtovideos");
        vidArea.removeChild(vidArea.firstChild);
        vidArea.style.display = "none";
        vidOverview.style.display = "block";
        buttonBackToVideos.style.display = "none";
        hideSlideShow();
    }
}

//Creats a new comment
function submitComment(){
    const newComment = document.createElement("div");
    const authorInput = document.getElementById("inputname");
    const messageInput = document.getElementById("inputmessage");
    const date = new Date();
    if(!isInputLegal(authorInput.value) || !isInputLegal(messageInput.value)){
        return;
    }
    newComment.setAttribute("class","comment");
    newComment.innerHTML = "<h3>" + authorInput.value + " - " + date.toDateString() + " " + date.toTimeString() +  "</h3>" + messageInput.value;
    document.getElementById("commentsection").appendChild(newComment);

    authorInput.value = "";
    messageInput.value = "";
}
//*************************************Slideshow-Functions***********************************
function slideshowGetVideo(i) {
    if (i===0) {
        var json = {"id": "v02", "src": "media/videos/Avengers_Whatever_It_Takes.mp4", "name": "Whatever_it_takes", "duration": "0:04"};
        var test_string = JSON.stringify(json);
        showVideoPlayerHideOverview(test_string);
    }

}
function hideSlideShow() {
    const slideShow= document.getElementById("slideShow");
    if(slideShow.style.display=="none"){
        slideShow.style.display = "block";
    }else {
        slideShow.style.display = "none";
    }

}